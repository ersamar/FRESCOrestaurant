<?php

$host = 'localhost';
$username = 'root';
$password = '';
$dbname = 'user_management';

$mysqli = new mysqli($host, $username, $password, $dbname);

if ($mysqli->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Database connection failed: ' . $mysqli->connect_error]));
}

$user_username = $_POST['username'] ?? '';
$user_password = $_POST['password'] ?? '';
$user_email = $_POST['email'] ?? '';

if (empty($user_username) || empty($user_password) || empty($user_email)) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
    exit();
}

$stmt = $mysqli->prepare("SELECT user_id FROM users WHERE username = ?");
$stmt->bind_param("s", $user_username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(['status' => 'error', 'message' => 'Username already exists.']);
    $stmt->close();
    $mysqli->close();
    exit();
}
$stmt->close();

$hashed_password = password_hash($user_password, PASSWORD_BCRYPT);

$stmt = $mysqli->prepare("INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, NOW())");
$stmt->bind_param("sss", $user_username, $user_email, $hashed_password);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Registration successful!']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Registration failed: ' . $stmt->error]);
}

$stmt->close();
$mysqli->close();
?>
