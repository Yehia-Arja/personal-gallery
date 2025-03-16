<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once "config/connection.php";
require "../vendor/autoload.php";

class UserModel {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function findId($id) {
        $sql = $this->conn->prepare("SELECT * FROM users WHERE id = ?");
        $sql->bind_param("i", $id);

        if (!$sql->execute()) {
            return false;
        }
        return $sql->get_result()->fetch_assoc();
    }

    public function findEmail($email) {
        $sql = $this->conn->prepare("SELECT * FROM users WHERE email = ?");
        $sql->bind_param("s", $email);

        if (!$sql->execute()) {
            return false;
        }
        return $sql->get_result()->fetch_assoc();
    }

    public function addUser($data) {
        $sql = $this->conn->prepare("INSERT INTO users (username,email,password) VALUES (?,?,?)");
        $sql->bind_param("sss", $data['username'], $data['email'], $data['password']);
        $sql->execute();

        $last_inserted_id = $sql->insert_id;
        return $last_inserted_id;
    }

    public function checkAuth($id) {
        $sql = $this->conn->prepare("SELECT * FROM users WHERE id = ?");
        $sql->bind_param("i", $id);
        
        if (!$sql->execute()) {
            return false;
        }
        return $sql->get_result()->fetch_assoc();
    }

    public function checkPassword($data) {
        $sql = $this->conn->prepare("SELECT * FROM users WHERE email = ?");
        $sql->bind_param("s", $data['email']);

        if (!$sql->execute()) {
            return false;
        }
        $result = $sql->get_result()->fetch_assoc();
        
        if (!password_verify($data['password'], $result['password'])) {
            return false;
        }
        return true;
    }

    public function generateAuthToken($user_id) {
        $secret_key = JWT_SECRET;
        $payload = [
            "user_id" => $user_id,
            "exp" => time() + 3600
        ];

        $token = JWT::encode($payload, $secret_key, 'HS256');

        $sql = $this->conn->prepare("UPDATE users SET auth_token = ? WHERE id = ?");
        $sql->bind_param("si", $token, $user_id);
        $sql->execute();

        return $token;
    }

    public function verifyToken($token) {
        $secret_key = JWT_SECRET;
        try {
            $decoded = JWT::decode($token, new Key($secret_key, 'HS256'));
            $user_id = $decoded->user_id;

            $sql = $this->conn->prepare("SELECT id FROM users WHERE id = ? AND auth_token = ?");
            $sql->bind_param("is", $user_id, $token);
            $sql->execute();

            return $sql->get_result()->num_rows > 0;
        } catch (Exception $e) {
            return false;
        }
    }
}