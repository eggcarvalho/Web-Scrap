<?php

namespace App\Http\DTOs;


class ProductDto
{
    public function __construct(
        public string $name,
        public float $description,
        public int $price,
        public string $image,
        public string $link,
        public string $slug,
    ) {}


    public function toArray(): array
    {
        return [
            "name" => $this->name,
            "description" => $this->description,
            "price" => $this->price / 100,
            "image" => $this->image,
            "link" => $this->link,
            "slug" => $this->slug,
        ];
    }
}
