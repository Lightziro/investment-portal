<?php

namespace App\Mail;

use App\Models\User\UserRecovery;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ForgotPassword extends Mailable
{
    use Queueable, SerializesModels;

    protected UserRecovery $recovery_model;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(UserRecovery $recovery_model)
    {
        $this->recovery_model = $recovery_model;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build(): static
    {
        return $this->view('emails.forgotPassword')->with([
            'full_name' => (string)$this->recovery_model->user,
            'key' => $this->recovery_model->key,
        ]);
    }
}
