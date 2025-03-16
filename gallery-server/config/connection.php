<?php

$conn = new mysqli('localhost', 'root', '', 'personal-gallery');
define("JWT_SECRET", "5611");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
