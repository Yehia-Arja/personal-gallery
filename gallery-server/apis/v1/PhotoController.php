<?php
require_once __DIR__ . '/../models/PhotosModel.php';
require_once __DIR__ . '/../config/connection.php';


$data = json_decode(file_get_contents("php://input", true));

class PhotoController {
    private $model;

    public function __construct($db) {
        $this->model = new PhotosModel($db);
    }

    public function fetchPhotos() {
        global $data;

        $photos = $this->model->getPhotos($data['search']);

        echo json_encode(['success' => true,'message' => $photos]);
    }
}
?>
