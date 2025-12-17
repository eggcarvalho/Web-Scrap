<?php

namespace App\Http\DTOs;


class CheckoutDto
{


    public function __construct(
        public int $product_id = 0,
        public string $name,
        public string $email,
        public CardDto $card,
        public int $order_id = 0,
    ) {}
}
