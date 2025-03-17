<?php
require_once __DIR__ . '/../config/connection.php';

class PhotoModel {
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

     public static function storePhoto($photo_url, $photo_tag, $photo_description) {
        global $conn;
        $sql = $conn->prepare("INSERT INTO photos (url, tag, description) VALUES (?, ?, ?)");
        $sql->bind_param("sss", $photo_url, $photo_tag, $photo_description);
        
        if (!$sql->execute()) {
            return false;
        } else {
            return true;
        }
    }
}

?>
