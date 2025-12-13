<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f4f4f4; padding: 10px; text-align: center; }
        .footer { margin-top: 30px; font-size: 0.8em; color: #777; text-align: center; }
        .status-badge { 
            display: inline-block; 
            padding: 5px 10px; 
            border-radius: 4px; 
            background-color: #007bff; 
            color: #fff; 
            font-weight: bold;
            text-transform: capitalize;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Order Status Updated</h1>
        </div>
        
        <p>Hello, {{ $order->name }}!</p>
        
        <p>We are writing to inform you that the status of your order <strong>#{{ $order->id }}</strong> has been updated.</p>
        
        <p>New Status: <span class="status-badge">{{ $order->status }}</span></p>
        
        <p>If you have any questions, please feel free to contact us.</p>
        
        <p>Best regards,<br>The Team</p>
        
        <div class="footer">
            <p>This is an automated message. Please do not reply directly to this email.</p>
        </div>
    </div>
</body>
</html>
