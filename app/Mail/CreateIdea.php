<?php

namespace App\Mail;

use App\Models\Investment\InvestmentIdea;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CreateIdea extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;
    protected InvestmentIdea $idea;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(InvestmentIdea $idea)
    {
        $this->idea = $idea;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build(): static
    {
        $company = $this->idea->company;

        return $this->view('email.new_idea')->with([
            'idea' => $this->idea,
        ])->subject("Новая инвестиционная идея $company->name($company->ticker)");
    }
}
