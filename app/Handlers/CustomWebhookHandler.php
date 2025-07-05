<?php
namespace App\Handlers;

use App\Enums\BalanceUp;
use App\Models\User\User;
use DefStudio\Telegraph\DTO\SuccessfulPayment;
use DefStudio\Telegraph\Handlers\WebhookHandler;
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
            'title' => 'Balance up success',
        ]);

        Log::debug('debugSuccess', [$successfulPayment->invoicePayload()]);
    }

    public function start()
    {
        $this->chat->message('Привет')->send();
    }
}
