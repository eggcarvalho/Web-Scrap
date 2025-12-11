<?php

namespace App\Services;

use App\Http\DTOs\CheckoutDto;
use App\Repositories\CheckoutRepository;

class CheckoutService
{


    public function __construct(private CheckoutRepository $repository) {}

    public function store(CheckoutDto $dto)
    {


        $vector = [
            'product_id'        => $dto->product_id,
            'name'              => $dto->name,
            'email'             => $dto->email,
            'encrypted_card'    => $dto->card->encryptCard(),
        ];


        $this->repository->store($vector);
    }
}
