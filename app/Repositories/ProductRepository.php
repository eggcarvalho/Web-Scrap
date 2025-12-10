<?php

namespace App\Repositories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;

class ProductRepository
{

    public function getProductBySlug(string $slug): Collection
    {
        return Product::where("slug", $slug)->first();
    }
}
