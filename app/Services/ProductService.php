<?php

namespace App\Services;

use App\Http\DTOs\ProductDto;
use App\Repositories\ProductRepository;
use Exception;

class ProductService
{
    public function __construct(private ProductRepository $repository) {}

    public function getProductBySlug(string $slug): ProductDto
    {

        $productDao = $this->repository->getProductBySlug($slug);

        if ($productDao) {
            return new ProductDto(
                product_id: $productDao->id,
                name: $productDao->name,
                price: $productDao->price,
                image: $productDao->image,
                description: $productDao->description
            );
        }


        throw new \Exception("Product not found");
    }
}
