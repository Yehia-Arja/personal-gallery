<?php
require_once 'config/connection.php';
require_once  'models/PhotoModel.php';



class PhotoController {
    private $model;

    public function __construct($db) {
        $this->model = new PhotoModel($db);
    }

    public function fetchPhotos() {
        $data = json_decode(file_get_contents("php://input", true));

        $photos = $this->model->getPhotos($data['search']);

        echo json_encode(['success' => true,'message' => $photos]);
    }   
    public static function uploadPhoto() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {

            $upload_dir = __DIR__ . "/uploads/";
            $file_name = time() . "_" . basename($_FILES['file']['name']);
            $target_path = $upload_dir . $file_name;

            if (!is_dir($upload_dir)) {
                mkdir($upload_dir, 0777, true);
            }
            
            if (move_uploaded_file($_FILES['file']['tmp_name'], $target_path)) {
                $photo_url = "uploads/" . $file_name;
                $photo_tag = $_POST['tag'] ?? ''; 
                $photo_description = $_POST['description'] ?? ''; 

                $photoId = PhotoModel::storePhoto($photo_url, $photo_tag, $photo_description);

                if ($photoId) {
                    echo json_encode(['success' => true, 'message' => 'Photo uploaded successfully']);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Failed to save photo to database']);
                }
            } else {
                echo json_encode(['success' => false, 'message' => 'File upload failed']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'No file uploaded']);
        }
    }
}
?>
