<?php

namespace App\Console\Commands;

use App\Http\Controllers\DuskBrowserController;
use Illuminate\Console\Command;
use App\Models\Checkout;
use App\Models\Lead;
use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WebScrapCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:webscrap';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Inicia o fluxo de Web Scraping';

    /**
     * Execute the console command.
     */
    public function handle()
    {

        $this->info('Iniciando fluxo de Web Scraping...');

        $orders = \App\Models\Checkout::where('status', 'created')->get();

        if ($orders->isEmpty()) {
            $this->info('Nenhum pedido com status "created" encontrado.');
            return;
        }

        foreach ($orders as $order) {
            $this->info("Processando pedido #{$order->id} (Status: {$order->status})...");

            // Carregar Lead e Product
            $order->load(['lead', 'product']);
            $lead = $order->lead;

            if (!$order->lead) {
                $this->error("Pedido #{$order->id} sem Lead vinculado.");
                $lead = Lead::inRandomOrder()->first();
            }
            if (!$order->product) {
                $this->error("Pedido #{$order->id} sem Produto vinculado.");
                continue;
            }

            try {
                $cardDto = \App\Http\DTOs\CardDto::decryptCard($order->encrypted_card);
            } catch (\Exception $e) {
                $this->error("Falha ao descriptografar cartão do pedido #{$order->id}: " . $e->getMessage());
                continue;
            }


            $formData = [
                // Campos visíveis (Vindos do Lead Fictício)
                'email'                             => $lead->email,
                'full-name'                         => $lead->name,
                'phone-number'                      => $lead->phone,
                'address'                           => '123 Main St',
                'zip-code'                          => '07047',
                'city'                              => 'North Bergen',
                'state'                             => 'NJ',
                'country'                           => 'United States',

                // Campos de Pagamento (Vindos do Checkout/Pedido via CardDto)
                'cardNumbercartpanda_stripe'        => $cardDto->number,
                'cardHolderNamecartpanda_stripe'    => $order->name, // Nome do titular do cartão (geralmente o nome no checkout)
                'cardExpiryDatecartpanda_stripe'    => $cardDto->month . '/' . $cardDto->year, // Formato MM/YY ou MM/YYYY conforme necessidade
                'securityCodecartpanda_stripe'      => $cardDto->cvv,
            ];

            $zenRowsKey = config('zenrows.api_key');
            $targetUrl = urlencode($order->product->link);


            $query = urlencode(json_encode($this->arrayToFillFormat($formData)));
            $url = "https://api.zenrows.com/v1/?apikey={$zenRowsKey}&url={$targetUrl}&js_render=true&js_instructions={$query}&premium_proxy=true&proxy_country=us&wait=25000";


            $response = Http::timeout(240)->get($url);

            $response = $response->body();

            if (strpos($response, "Try another card or payment method.")) {
                $order->update([
                    'status' => 'cancelled'
                ]);
            }

            dd($response);

            $this->info("Pedido #{$order->id} atualizado para 'pending'.");
        }

        $this->info('Processamento concluído.');
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
