<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    use HasFactory;

    /** @use HasFactory<\Database\Factories\LeadFactory> */
    protected $fillable = ['name', 'email', 'phone'];

    public function checkouts()
    {
        return $this->hasMany(Checkout::class);
    }
}
