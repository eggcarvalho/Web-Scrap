<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f4f4f4; padding: 10px; text-align: center; }
        .product-image { max-width: 100%; height: auto; margin-top: 20px; border-radius: 8px; }
        .footer { margin-top: 30px; font-size: 0.8em; color: #777; text-align: center; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Order Received Successfully!</h1>
        </div>
        
        <p>Hello, {{ $checkout->name }}!</p>
        
        <p>Thank you for your order. We have successfully received your request for the following product:</p>
        
        <h2>{{ $product['name'] }}</h2>
        
        <p>{{ $product['description'] }}</p>
        
        @if(isset($product['image']))
            <img src="{{ $product['image'] }}" alt="{{ $product['name'] }}" class="product-image">
        @endif
        
        <p>We will review your order and get back to you shortly with more information.</p>
        
        <p>Best regards,<br>The Team</p>
        
        <div class="footer">
            <p>This is an automated message. Please do not reply directly to this email.</p>
        </div>
    </div>
</body>
</html>
