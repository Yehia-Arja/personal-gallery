<?php
require "../../models/UserModel.php";

header('Content-Type: application/json'); 

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'Invalid JSON input']);
    exit;
}

class UserController
{
    public static function login()
    {
        global $data;

        if (empty($data['email']) || empty($data['password'])) {
            echo json_encode(['success' => false, 'message' => 'Missing information']);
            return;
        }

        if (!UserModel::findEmail($data['email'])) {
            echo json_encode(['success' => false, 'message' => 'Email does not exist']);
            return;
        }

        if (!UserModel::checkPassword($data)) {
            echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
            return;
        }

        $token = UserModel::generateAuthToken($data['id']);

        echo json_encode([
            'success' => true,
            'auth_key' => $token,
            'user_id' => $data['id']
        ]);
    }
    
}
