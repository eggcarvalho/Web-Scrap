<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckIfProductExistsRequest;
use App\Models\Checkout;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckoutController extends Controller
{

    public function __construct(private ProductService $service) {}
    /**
     * Display a listing of the resource.
     */
    public function index(string $slug)
    {
        try {
            $product = $this->service->getProductBySlug($slug);
            return Inertia::render(
                "Checkout/Form",
                [
                    "product" => $product->toArray(),
                ]
            );
        } catch (\Exception $e) {
            return Inertia::render("Errors/ProductNotFound");
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Checkout $checkout)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Checkout $checkout)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Checkout $checkout)
    {
        //
    }
}
