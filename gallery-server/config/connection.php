<?php

define("JWT_SECRET", "yehia");


$conn = new mysqli('localhost', 'root', '', 'personal-gallery');


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
