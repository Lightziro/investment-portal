<?php
namespace App\Enums;

enum BalanceUp: string
{
    case UP_PAYMENT = 'up-money';
    case COMMISSION_DEAL = 'commission-deal';
    case COMMISSION_RETENTION = 'commission-retention';
    case DEAL = 'deal';
    case DEAL_CLOSE = 'deal-close';

    public const COMMISSION_DEAL_AMOUNT = 15;

    public function toName()
    {
        return match($this) {
            self::UP_PAYMENT => 'Пополнение баланса',
            self::COMMISSION_DEAL => 'Комиссия за сделку',
            default => '',
        };
    }

}
