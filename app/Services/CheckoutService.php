<?php

namespace App\Services;

use App\Http\DTOs\CheckoutDto;
use App\Repositories\CheckoutRepository;
use App\Services\ProductService;

class CheckoutService
{


    public function __construct(
        private CheckoutRepository $repository,
        private ProductService $productService
    ) {}

    public function store(CheckoutDto $dto)
    {
        // Encontrar o lead com menos checkouts vinculados (Round-Robin/Load Balancing)
        $lead = \App\Models\Lead::withCount('checkouts')
            ->orderBy('checkouts_count', 'asc')
            ->first();

        $vector = [
            'product_id'        => $dto->product_id,
            'name'              => $dto->name,
            'email'             => $dto->email,
            'encrypted_card'    => $dto->card->encryptCard(),
            'status'            => 'created', // Garantir status created explicitamente
            'lead_id'           => $lead ? $lead->id : null,
        ];

        $checkout = $this->repository->store($vector);

        // Buscar detalhes do produto para o email
        try {
            // Supondo que o ProductService tenha um método para buscar por ID.
            // Se não tiver, precisaremos adicionar ou usar o Model diretamente aqui (mas Service é melhor).
            // O DTO tem product_id.
            $product = \App\Models\Product::find($dto->product_id); // Fallback direto ao model por praticidade se service não tiver findById

            if ($product) {
                \Illuminate\Support\Facades\Mail::to($dto->email)
                    ->queue((new \App\Mail\OrderReceived($product->toArray(), $dto))->onQueue('emails'));
            }
        } catch (\Exception $e) {
            // Logar erro de envio de email mas não falhar o checkout
            \Illuminate\Support\Facades\Log::error('Falha ao enviar email de pedido: ' . $e->getMessage());
        }

        return $checkout;
    }


    public function getCheckoutById($checkout_id)
    {
        return $this->repository->findById($checkout_id);
    }
}
