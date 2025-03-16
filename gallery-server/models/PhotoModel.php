<?php
require_once __DIR__ . '/../config/connection.php';

class PhotosModel {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getPhotos($search) {
        $stmt = $this->conn->prepare("SELECT * FROM photos WHERE description LIKE CONCAT('%', ?, '%')");
        $stmt->bind_param("s", $search);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }
}
?>
