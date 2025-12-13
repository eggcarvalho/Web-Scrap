<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        return Inertia::render('Admin/Products/Index', [
            'products' => $query->orderBy('created_at', 'desc')->paginate(10)->withQueryString(),
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Products/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0', // Recebe em reais (ex: 10.50)
            'image' => 'nullable|image|max:2048', // Upload de imagem
            'link' => 'nullable|url',
        ]);

        $data = $request->except('image');
        $data['slug'] = Str::slug($request->name) . '-' . Str::random(6);
        $data['price'] = (int) ($request->price * 100); // Converte para centavos

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $data['image'] = Storage::url($path);
        }

        Product::create($data);

        return redirect()->route('admin.products.index')->with('success', 'Produto criado com sucesso.');
    }

    public function edit(Product $product)
    {
        return Inertia::render('Admin/Products/Edit', [
            'product' => [
                ...$product->toArray(),
                'price_formatted' => $product->price / 100 // Envia em reais para edição
            ]
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable', // Pode ser string (URL antiga) ou arquivo (nova imagem)
            'link' => 'nullable|url',
        ]);

        $data = $request->except(['image', 'slug']);
        // Opcional: Atualizar slug se nome mudar? Por enquanto manteremos o slug original ou logicamente separado.
        // Vamos manter o slug original para evitar quebra de links externos, ou atualizar se desejar.
        // $data['slug'] = Str::slug($request->name); 

        $data['price'] = (int) ($request->price * 100);

        if ($request->hasFile('image')) {
            // Deletar imagem antiga se necessário?
            // if ($product->image) { ... }
            
            $path = $request->file('image')->store('products', 'public');
            $data['image'] = Storage::url($path);
        }

        $product->update($data);

        return redirect()->route('admin.products.index')->with('success', 'Produto atualizado com sucesso.');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Produto excluído com sucesso.');
    }
}
