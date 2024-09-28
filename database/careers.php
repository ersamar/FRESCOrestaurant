<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "user_management";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $position = $_POST['position'];
    $availableDate = $_POST['availableDate'];
    
    $resumeLink = '';
    if (isset($_FILES['resumeLink']) && $_FILES['resumeLink']['error'] == 0) {
        $targetDir = 'uploads/';
        $targetFile = $targetDir . basename($_FILES['resumeLink']['name']);
        if (move_uploaded_file($_FILES['resumeLink']['tmp_name'], $targetFile)) {
            $resumeLink = $targetFile;
        } else {
            echo 'Error uploading file.';
            exit;
        }
    }

    $stmt = $conn->prepare("INSERT INTO careers (first_name, last_name, email, phone, position, available_date, resume_link) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $firstName, $lastName, $email, $phone, $position, $availableDate, $resumeLink);

    if ($stmt->execute()) {
        echo 'Your application was sent!';
    } else {
        echo 'Error: ' . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
