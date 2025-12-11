<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCheckoutRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'product_id'    => "required|integer|exists:products,id",
            'name'          => "required|string|max:255",
            'email'         => "required|email|max:255",
            'card.number'   => "required|string|max:16",
            'card.month'    => "required|string|size:2",
            'card.year'    => "required|string|size:4",
            'card.cvv'      => "required|string|max:3",
        ];
    }


    public function messages()
    {
        return [

            // product_id
            'product_id.required'   => 'The product_id field is required.',
            'product_id.integer'    => 'The product_id must be an integer.',
            'product_id.exists'     => 'The selected product_id is invalid.',

            // name
            'name.required'         => 'The name field is required.',
            'name.string'           => 'The name must be a string.',
            'name.max'              => 'The name may not be greater than 255 characters.',

            // email
            'email.required'        => 'The email field is required.',
            'email.email'           => 'The email must be a valid email address.',
            'email.max'             => 'The email may not be greater than 255 characters.',

            // card.number
            'card.number.required'  => 'The card number field is required.',
            'card.number.string'    => 'The card number must be a string.',
            'card.number.max'       => 'The card number may not be greater than 16 characters.',

            // card.month
            'card.month.required'   => 'The card month field is required.',
            'card.month.string'     => 'The card month must be a string.',
            'card.month.size'       => 'The card month must be exactly 2 characters.',

            // card.year
            'card.year.required'    => 'The card year field is required.',
            'card.year.string'      => 'The card year must be a string.',
            'card.year.size'        => 'The card year must be exactly 4 characters.',

            // card.cvv
            'card.cvv.required'     => 'The card CVV field is required.',
            'card.cvv.string'       => 'The card CVV must be a string.',
            'card.cvv.max'          => 'The card CVV may not be greater than 3 characters.',
        ];
    }
}
