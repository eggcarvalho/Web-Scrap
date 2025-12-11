<?php

namespace App\Http\DTOs;

class CardDto
{
    public function __construct(
        public string $number,
        public string $month,
        public string $year,
        public string $cvv
    ) {}


    public function encryptCard()
    {
        return serialize([
            'number' => $this->number,
            'month' => $this->month,
            'year' => $this->year,
            'cvv' => $this->cvv,
        ]);
    }

    public static function decryptCard(string $encrypted_card): self
    {
        $data = unserialize($encrypted_card);


        return new self(
            number: $data['number'],
            month: $data['month'],
            year: $data['year'],
            cvv: $data['cvv'],
        );
    }
}
