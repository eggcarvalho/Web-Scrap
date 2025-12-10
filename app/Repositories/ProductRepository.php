<?php

namespace App\Repositories;

use App\Models\Product;

class ProductRepository
{

    public function getProductBySlug(string $slug): Product|null
    {
        return Product::where("slug", $slug)->first();
    }
}
