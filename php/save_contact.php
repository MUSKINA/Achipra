<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw POST data and decode JSON
    $jsonData = file_get_contents('php://input');
    $data = json_decode($jsonData, true);

    // Check for JSON errors
    if (json_last_error() !== JSON_ERROR_NONE) {
        echo 'Invalid JSON data';
        exit;
    }

    // Extract and sanitize data
    $name = isset($data['name']) ? trim($data['name']) : '';
    $email = isset($data['email']) ? trim($data['email']) : '';
    $message = isset($data['message']) ? trim($data['message']) : '';
    $created_at = date('Y-m-d H:i:s');

    // Check if fields are empty
    if (empty($name) || empty($email) || empty($message)) {
        echo 'All fields are required';
        exit;
    }

    // Database connection
    $conn = new mysqli('localhost', 'root', 'root', 'contactinfo');

    if ($conn->connect_error) {
        echo 'Connection Failed: ' . $conn->connect_error;
        exit;
    }

    // Prepare SQL statement
    $stmt = $conn->prepare("INSERT INTO contacts (name, email, message, created_at) VALUES (?, ?, ?, ?)");
    if (!$stmt) {
        echo 'Prepare failed: ' . $conn->error;
        exit;
    }

    // Bind parameters and execute
    $stmt->bind_param("ssss", $name, $email, $message, $created_at);

    if ($stmt->execute()) {
        echo 'Message saved successfully';
    } else {
        echo 'Error: ' . $stmt->error;
    }

    // Close connections
    $stmt->close();
    $conn->close();
}
?>
