<?php

namespace App\Repositories;

use App\Models\Checkout;

class CheckoutRepository
{


    public function store(array $data)
    {
        return Checkout::create($data);
    }


    public function findById($order_id)
    {
        return Checkout::findOrFail($order_id);
    }
}
