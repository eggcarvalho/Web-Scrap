<!-- Instruções concisas para agentes de codificação (Copilot/AI) -->

# Copilot / AI Instructions

Objetivo rápido: ajudar um agente a ser produtivo imediatamente neste projeto Laravel específico.

-   **Arquitetura geral:** aplicativo Laravel moderno (PHP 8.5, Laravel 12) com camadas Services → Repositories → Models. As operações de negócio ficam em `app/Services` e persistência em `app/Repositories` — prefira usar essas camadas ao invés de tocar Models diretamente quando possível.

-   **Fluxo de Web Scraping:** o comando de linha que dispara o fluxo está em [app/Console/Commands/WebScrapCommand.php](app/Console/Commands/WebScrapCommand.php#L1-L200). Ele consulta `Checkout` com status `created`, monta `CardDto` (descriptografa cartão) e usa a API ZenRows (chave em [config/zenrows.php](config/zenrows.php#L1-L20)). Há código comentado para integração com `DuskBrowserController` — use isso como referência para execução local com browser headless.

-   **Padrões de projeto visíveis:**

    -   Services recebem Repositories via construtor (ex.: [app/Services/CheckoutService.php](app/Services/CheckoutService.php#L1-L200)).
    -   Repositories encapsulam Eloquent (ex.: [app/Repositories/CheckoutRepository.php](app/Repositories/CheckoutRepository.php#L1-L200)).
    -   DTOs vivem em `app/Http/DTOs` (ex.: `CheckoutDto`, `CardDto`) e são usados para validar/transportar dados entre camadas.

-   **Conservadorismo ao modificar dados:** quando atualizar lógica de criação de checkout, atualize `CheckoutService::store()` e `CheckoutRepository::store()` em vez de modificar controllers ou modelos diretamente.

-   **Integrações e secrets:**

    -   ZenRows: chave via `ZENROWS_API_KEY` / [config/zenrows.php](config/zenrows.php#L1-L20). As chamadas feitas em `WebScrapCommand` montam uma URL com `js_instructions` — preserve formato JSON gerado por `arrayToFillFormat()` se alterar o fluxo.
    -   E-mail: envio assíncrono usando Mail queue em `CheckoutService` (fila `emails`).

-   **Fluxos de execução / comandos úteis:**

    -   Instalação completa: `composer run setup` (rode scripts definidos em `composer.json`).
    -   Desenvolvimento (simultâneo): `composer run dev` — usa `php artisan serve`, `queue:listen`, `npm run dev`, etc.
    -   Testes: `composer run test` (executa `php artisan test`).

-   **Conveniências e convenções do repositório:**

    -   Mensagens de status do pedido usam strings literais (`created`, `pending`) — mantenha consistência.
    -   Cartões são tratados por `CardDto::encryptCard()` / `CardDto::decryptCard()` (não invente outro formato).
    -   Para preencher formulários via ZenRows, `arrayToFillFormat()` gera instruções `fill` e `click`; mantenha esse formato se for gerar instruções alternativas.

-   **Onde olhar primeiro ao editar scraping/payment flows:**

    -   [app/Console/Commands/WebScrapCommand.php](app/Console/Commands/WebScrapCommand.php#L1-L200) — orquestra o scraping.
    -   [app/Http/DTOs/CardDto.php](app/Http/DTOs/CardDto.php#L1-L200) — manipulação de dados de cartão (criptografia).
    -   [config/zenrows.php](config/zenrows.php#L1-L20) — variável de ambiente para API.
    -   [app/Services/CheckoutService.php](app/Services/CheckoutService.php#L1-L200) e [app/Repositories/CheckoutRepository.php](app/Repositories/CheckoutRepository.php#L1-L200) — persistência e regras de criação.

-   **Boas práticas específicas deste projeto (evitar erros comuns):**

    -   Nunca logue/não exponha `encrypted_card` em logs; use `CardDto` para extrair apenas campos necessários.
    -   Ao modificar comandos de fila, mantenha a fila `emails` para envios de order receipts.
    -   Se alterar chamadas externas (ZenRows), preserve parâmetros `wait`, `js_render` e `premium_proxy` quando depender de JS render para preencher pagamentos.

-   **Solicitação de revisão:** após mudanças em scraping/payment, adicione um snippet de teste local (ex.: um comando Artisan menor que simule um `Checkout` com `status=created`) e documente como reproduzir no README ou em um pequeno arquivo `docs/`.

Se algo acima estiver incompleto ou se quiser que eu adicione exemplos de edição automática (patches), diga o que gostaria que eu priorizasse.
