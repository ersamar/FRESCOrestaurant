<?php
// reserve.php

header('Content-Type: application/json');

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "user_management"; // Change this to your database name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'error' => 'Database connection failed: ' . $conn->connect_error]);
    exit();
}

$response = [
    'success' => false,
    'error' => ''
];

// Check if the required fields are set
if (
    isset($_POST['number_of_people']) && 
    isset($_POST['reservation_time']) && 
    isset($_POST['reservation_date']) &&
    isset($_POST['event_type']) && 
    isset($_POST['event_price'])
) {
    // Sanitize and store the values from the POST data
    $number_of_people = $_POST['number_of_people'];
    $reservation_time = $_POST['reservation_time'];
    $reservation_date = $_POST['reservation_date'];
    $event_type = $_POST['event_type'];
    $event_price = $_POST['event_price'];

    // Insert data into the reservations table
    $query = "INSERT INTO reservations (number_of_people, reservation_time, reservation_date, event_type, event_price) 
              VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("sssss", $number_of_people, $reservation_time, $reservation_date, $event_type, $event_price);

    if ($stmt->execute()) {
        $response['success'] = true;
    } else {
        $response['error'] = 'Database insertion failed: ' . $stmt->error;
    }

    $stmt->close();
} else {
    $response['error'] = 'Required fields missing';
}

// Return the JSON response
echo json_encode($response);
?>