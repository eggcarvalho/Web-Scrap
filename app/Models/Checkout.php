<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Checkout extends Model
{
    protected $fillable = [
        'product_id',
        'name',
        'email',
        'encrypted_card'
    ];
}
