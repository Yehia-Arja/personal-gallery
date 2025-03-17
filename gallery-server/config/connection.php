<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); 
header('Access-Control-Allow-Headers: Content-Type, Authorization');


$conn = new mysqli('localhost', 'root', '', 'gallery');
define("JWT_SECRET", "5611");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
