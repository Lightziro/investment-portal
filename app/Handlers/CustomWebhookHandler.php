<?php
namespace App\Handlers;

use App\Enums\BalanceUp;
use App\Models\User\User;
use DefStudio\Telegraph\DTO\SuccessfulPayment;
use DefStudio\Telegraph\Handlers\WebhookHandler;
use DefStudio\Telegraph\Keyboard\Button;
use DefStudio\Telegraph\Keyboard\Keyboard;
use Illuminate\Support\Facades\Log;

class CustomWebhookHandler extends WebhookHandler
{
    public function __construct()
    {
    }
    protected function handleSuccessfulPayment(SuccessfulPayment $successfulPayment): void
    {
        $userId = (int)$successfulPayment->invoicePayload();

        /** @var User $user */
        $user = User::query()->firstWhere('user_id', $userId);
        $amount = $successfulPayment->totalAmount();
        $user->balance = $user->balance + $amount;
        $user->save();
        $user->balanceTransfers()->create([
            'amount' => $amount,
            'event' => BalanceUp::UP_PAYMENT->value,
        ]);
        $user->notices()->create([
            'viewed' => false,
            'title' => 'Ваш баланс успешно пополнен',
            'description' => "<span style='display: flex; gap: 5px; align-items: center'>
                {$amount}
                <img src='/images/picture/tg-star.svg'/>
</span>"
        ]);

        Log::debug('debugSuccess', [$successfulPayment->invoicePayload()]);
    }

    public function start()
    {
        $user = $this->message->from();
        $findUser = User::query()->firstWhere('telegram_id', $user->id());
        if (!$findUser) {
            /** @var User $newUser */
            $newUser = User::query()->create([
                'username' => $user->username(),
                'first_name' => $user->firstName(),
                'last_name' => $user->lastName(),
                'telegram_id' => $user->id(),
                'balance' => 100,
            ]);
            $newUser->notices()->create([
                'viewed' => false,
                'title' => 'Добро пожаловать! Начислили приветственный бонус',
                'description' => "<span style='display: flex; gap: 5px; align-items: center'>
                100
                <img src='/images/picture/tg-star.svg'/>
</span>"
            ]);
            $newUser->balanceTransfers()->create([
                'amount' => 100,
                'event' => BalanceUp::WELCOME_BONUS->value,
            ]);

        }
        $keyboard = Keyboard::make()->row([
            Button::make(__('Зарабатывать в приложении'))->webApp(env('WEB_URL')),
        ]);
        $this->chat->message(__('telegram.start'))->keyboard($keyboard)->send();
    }
}
