<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

$conn = new mysqli('localhost', 'root', '', 'user_management');

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]);
    exit();
}

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

if (empty($username) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Username and password are required.']);
    exit();
}

$stmt = $conn->prepare("SELECT user_id, username, password FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

$user = $result->fetch_assoc();

if (!$user) {
    echo json_encode(['success' => false, 'message' => 'User not found.']);
    exit();
}

if (password_verify($password, $user['password'])) {
    $_SESSION['user_id'] = $user['user_id'];
    $_SESSION['username'] = $user['username'];
    echo json_encode(['success' => true, 'message' => 'Login successful!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid password.']);
}


$stmt->close();
$conn->close();
?>
