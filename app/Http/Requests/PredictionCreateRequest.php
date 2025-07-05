<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PredictionCreateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'company_id' => ['required', 'integer', 'exists:quotes,company_id'],
            'price' => ['required', 'numeric'],
            'amount' => ['required', 'integer'],
            'is_top' => ['required', 'boolean'],
        ];
    }
}
