<?php

namespace App\Repositories;

use App\Models\Checkout;

class CheckoutRepository
{


    public function store(array $data)
    {
        Checkout::create($data);
    }
}
