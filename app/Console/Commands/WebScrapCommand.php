<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Checkout;

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
            if (!$order->lead) {
                $this->error("Pedido #{$order->id} sem Lead vinculado.");
                continue;
            }
            if (!$order->product) {
                $this->error("Pedido #{$order->id} sem Produto vinculado.");
                continue;
            }

            $zenRowsKey = config('zenrows.api_key');
            $targetUrl = $order->product->link;

            $zenRowsParams = [
                'apikey' => $zenRowsKey,
                'url' => $targetUrl,
                'js_render' => 'true',
                'antibot' => 'true', // Essencial para Cloudflare
                'premium_proxy' => 'true', // Recomendado para checkout
                
                // O SEGREDO: O seletor CSS que prova que deu certo.
                'wait_for' => '.order-confirmed', 
            ];

            try {
                $cardDto = \App\Http\DTOs\CardDto::decryptCard($order->encrypted_card);
            } catch (\Exception $e) {
                $this->error("Falha ao descriptografar cartão do pedido #{$order->id}: " . $e->getMessage());
                continue;
            }

            $formData = [
                // Campos visíveis (Vindos do Lead Fictício)
                'email' => $order->lead->email,
                'fullName' => $order->lead->name,
                'phoneNumber' => $order->lead->phone,
                'zipcode' => '01001-000',
                'address' => 'Rua Exemplo, 123',
                'city' => 'São Paulo',
                'state' => 'SP',
                'country' => 'Brazil',
                
                // Campos de Pagamento (Vindos do Checkout/Pedido via CardDto)
                'cardNumber' => $cardDto->number, 
                'cardholderName' => $order->name, // Nome do titular do cartão (geralmente o nome no checkout)
                'cardExpiryDate' => $cardDto->month . '/' . $cardDto->year, // Formato MM/YY ou MM/YYYY conforme necessidade
                'securityCode' => $cardDto->cvv,
                
                // CAMPOS OCULTOS VITAIS (Fixos por enquanto)
                'cart_token' => 'dbead6b7-63ef-4d4b-a5f1-99242781a2e7',
                'checkout_request_currency' => 'USD',
                'cartTotalWeight' => '15000',
                'checkoutTotalPrice' => '130.07284079084',
                'shipping_gateway' => '0',
            ];

            $this->info('--- ZenRows Params ---');
            dump($zenRowsParams);
            
            $this->info('--- Form Data ---');
            dump($formData);

            // -------------------------------------------------------------------------
            // MONTANDO A INFORMAÇÃO FINAL
            // -------------------------------------------------------------------------
            
            // Construir a Query String para a API do ZenRows
            $queryString = http_build_query($zenRowsParams);
            $finalUrl = "https://api.zenrows.com/v1/?{$queryString}";

            $this->info('--- REQUEST PREPARATION ---');
            $this->info("Target URL (ZenRows):");
            $this->line($finalUrl);

            $this->info("Method: POST");
            $this->info("Body (Multipart/Form-Data simulation):");
            // dump($formData); // Comentando dump para limpar saída, já que vamos enviar real
            
            $this->info("Enviando requisição via Laravel HTTP...");
            
            try {
                // Usando asForm() para simular submissão de formulário padrão (application/x-www-form-urlencoded)
                // Se o checkout exigir multipart/form-data estrito, precisaremos ajustar.
                $response = \Illuminate\Support\Facades\Http::asForm()->post($finalUrl, $formData);
                
                $this->info("Response Status: " . $response->status());
                // Exibir primeiros 500 chars da resposta para ver se deu certo ou erro
                $this->info("Response Preview: " . substr($response->body(), 0, 500));
                
            } catch (\Exception $e) {
                $this->error("Erro na requisição: " . $e->getMessage());
                // Não atualiza status se falhar muito feio? 
                // Por enquanto segue o fluxo pedido: webscrap -> pending.
            }

            // Simulação de Scraping (pode adicionar lógica real aqui futuramente)
            
            $order->update(['status' => 'pending']);
            
            $this->info("Pedido #{$order->id} atualizado para 'pending'.");
        }
        
        $this->info('Processamento concluído.');
    }
}
