<?php
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

// Extract data from the request
$orderType = $data['orderType'];
$pickupOption = $data['pickupOption'];
$pickupDate = $data['pickupDate'];
$pickupTime = $data['pickupTime'];
$deliveryAddress = $data['deliveryAddress'];
$specialRequests = $data['specialRequests'];
$totalAmount = $data['totalAmount'];
$cartItems = $data['cartItems'];

// Database connection (make sure to replace with your actual connection details)
$conn = new mysqli('localhost', 'root', '', 'user_management');

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

// Insert order into orders table
$stmt = $conn->prepare("INSERT INTO orders (order_type, pickup_option, pickup_date, pickup_time, delivery_address, special_requests, total_amount) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param('sssssss', $orderType, $pickupOption, $pickupDate, $pickupTime, $deliveryAddress, $specialRequests, $totalAmount);

if (!$stmt->execute()) {
    echo json_encode(['success' => false, 'message' => 'Failed to insert order']);
    $stmt->close();
    $conn->close();
    exit;
}

// Get the inserted order ID
$orderId = $stmt->insert_id;
$stmt->close();

// Insert order items into order_items table
$stmt = $conn->prepare("INSERT INTO order_items (order_id, item_name, item_price, item_quantity) VALUES (?, ?, ?, ?)");

foreach ($cartItems as $item) {
    $stmt->bind_param('isdd', $orderId, $item['name'], $item['price'], $item['quantity']);
    if (!$stmt->execute()) {
        echo json_encode(['success' => false, 'message' => 'Failed to insert order items']);
        $stmt->close();
        $conn->close();
        exit;
    }
}

$stmt->close();
$conn->close();

echo json_encode(['success' => true]);
?>
