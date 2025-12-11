<?php

namespace App\Http\DTOs;


class ProductDto
{
    public function __construct(
        private int $product_id = 0,
        private string $name = "",
        private string $description = "",
        private int $price = 0,
        private string $image = "",
        private string $link = "",
        private string $slug = "",
    ) {}


    public function toArray(): array
    {
        return [
            "id" => $this->product_id,
            "name" => $this->name,
            "description" => $this->description,
            "price" => $this->price / 100,
            "image" => $this->image,
            "link" => $this->link,
            "slug" => $this->slug,
        ];
    }
}
