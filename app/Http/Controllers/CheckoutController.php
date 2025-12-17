<?php

namespace App\Http\Controllers;

use App\Http\DTOs\CardDto;
use App\Http\DTOs\CheckoutDto;
use App\Http\Requests\CheckIfProductExistsRequest;
use App\Http\Requests\StoreCheckoutRequest;
use App\Jobs\ProcessPaymentScrap;
use App\Models\Checkout;
use App\Services\CheckoutService;
use App\Services\ProductService;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CheckoutController extends Controller
{

    public function __construct(private ProductService $productService, private CheckoutService $checkoutService) {}
    /**
     * Display a listing of the resource.
     */
    public function index(string $slug)
    {
        try {
            $product = $this->productService->getProductBySlug($slug);
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
    public function store(StoreCheckoutRequest $request)
    {
        try {
            $checkout = new CheckoutDto(
                product_id: $request->product_id,
                name: $request->name,
                email: $request->email,
                card: new CardDto(
                    number: $request->card['number'],
                    month: $request->card['month'],
                    year: $request->card['year'],
                    cvv: $request->card['cvv']
                )
            );
            $checkout = $this->checkoutService->store($checkout);


            ProcessPaymentScrap::dispatch($checkout)->onQueue('scrap');

            return back()->with('order_id', $checkout->order_id);
        } catch (QueryException $e) {
            // 1. Loga o erro técnico para o desenvolvedor (nunca mostre isso ao usuário)
            Log::error("Erro no checkout: " . $e->getMessage());

            // 2. Retorna para o formulário injetando um erro na prop 'errors' do Inertia
            // Você pode usar uma chave específica como 'database' ou 'general'
            return back()->withErrors([
                'general' => 'An internal error occurred while processing your request. Please try again.'
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($checkout_id)
    {
        $checkout = $this->checkoutService->getCheckoutById($checkout_id);
        if (!$checkout) {
            return response()->json([
                'status' => 'not_found'
            ], 404);
        }

        return response()->json([
            'status' => $checkout->status,
        ]);
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
