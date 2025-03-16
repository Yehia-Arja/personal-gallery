<?php

require_once "models/UserModel.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'Invalid JSON input']);
    exit;
}

class UserController
{
    private $userModel;

    public function __construct($conn)
    {
        $this->userModel = new UserModel($conn);
    }

    public function login()
    {
        global $data;

        if (empty($data['email']) || empty($data['password'])) {
            echo json_encode(['success' => false, 'message' => 'Missing information']);
            return;
        }

        if (!$this->userModel->findEmail($data['email'])) {
            echo json_encode(['success' => false, 'message' => 'Email does not exist']);
            return;
        }

        if (!$this->userModel->checkPassword($data)) {
            echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
            return;
        }

        $token = $this->userModel->generateAuthToken($data['id']);

        echo json_encode([
            'success' => true,
            'auth_key' => $token,
            'user_id' => $data['id']
        ]);
    }
}
