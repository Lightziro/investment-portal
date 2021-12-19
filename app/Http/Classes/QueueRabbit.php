<?php

namespace App\Http\Classes;

use PhpAmqpLib\Channel\AMQPChannel;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Exception\AMQPConnectionClosedException;
use PhpAmqpLib\Message\AMQPMessage;
use PhpAmqpLib\Wire\AMQPTable;

class QueueRabbit
{
    private string $host = 'host.docker.internal';
    private string $port = '5672';
    private string $user = 'guest';
    private string $password = 'guest';
    private ?AMQPStreamConnection $connection;
    private ?AMQPChannel $channel;
    private array $init_queues = [];

    public function __construct()
    {
        $this->connection = new AMQPStreamConnection($this->host, $this->port, $this->user, $this->password);
        $this->channel = $this->connection->channel();
        $this->channel->basic_qos(null, 1, null);
    }

    private function init_queue(string $queue, bool $requeue = false): void
    {
        if (!isset($this->init_queues[$queue])) {
            $this->channel->exchange_declare($queue,
                'direct',
                false,
                true,
                false,
                false
            );

            $this->channel->queue_declare(
                $queue,    #queue name - Имя очереди может содержать до 255 байт UTF-8 символов
                false,        #passive - может использоваться для проверки того, инициирован ли обмен, без того, чтобы изменять состояние сервера
                true,        #durable - убедимся, что RabbitMQ никогда не потеряет очередь при падении - очередь переживёт перезагрузку брокера
                false,        #exclusive - используется только одним соединением, и очередь будет удалена при закрытии соединения
                false,        #autodelete - очередь удаляется, когда отписывается последний подписчик
                false,
                $requeue ? new AMQPTable(["x-dead-letter-exchange" => "{$queue}_requeue"]) : []
            );

            $this->channel->queue_bind($queue, $queue);

            if ($requeue) {
                $this->channel->exchange_declare(
                    "{$queue}_requeue",
                    'direct',
                    false,
                    true,
                    false,
                    false
                );

                $this->channel->queue_declare(
                    "{$queue}_requeue",
                    false,
                    true,
                    false,
                    false,
                    false,
                    new AMQPTable(["x-dead-letter-exchange" => $queue, 'x-message-ttl' => 60000])
                );
                $this->channel->queue_bind("{$queue}_requeue", "{$queue}_requeue");
            }

            $this->init_queues[$queue] = true;
        }
    }


    public function send(string $queue, string $message)
    {
        $this->init_queue($queue);
        $msg = new AMQPMessage($message);
        $this->channel->basic_publish($msg, $queue);
    }

    public function consume($queue, $callback, $tag = ''): void
    {

        $this->channel->basic_consume($queue, $tag, false, false, false, false, $callback);

        while ($this->channel->is_consuming()) {
            try {
                $this->channel->wait();
            } catch (AMQPConnectionClosedException $e) {
                echo "{$e->getMessage()}\n";
                $this->channel->basic_consume($queue, $tag, false, false, false, false, $callback);
            }
        }
    }
}
