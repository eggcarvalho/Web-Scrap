<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use App\Models\Lead;

class Checkout extends Model
{
    protected $fillable = [
        'product_id',
        'name',
        'email',
        'encrypted_card',
        'status',
        'lead_id'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function lead()
    {
        return $this->belongsTo(Lead::class);
    }
}
