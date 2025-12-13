<?php

namespace App\Http\Controllers;

use App\Models\Checkout;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminOrderController extends Controller
{
    public function index()
    {
        $orders = Checkout::with('product')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders
        ]);
    }

    public function update(Request $request, Checkout $order)
    {
        $request->validate([
            'status' => 'required|in:created,pending,paid,shipped,cancelled,completed'
        ]);

        $order->update(['status' => $request->status]);

        // Enviar email de notificação de atualização de status
        try {
            \Illuminate\Support\Facades\Mail::to($order->email)
                ->queue((new \App\Mail\OrderStatusUpdated($order))->onQueue('emails'));
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error("Failed to send order status update email: " . $e->getMessage());
        }

        return redirect()->back()->with('success', 'Order status updated successfully.');
    }
}
