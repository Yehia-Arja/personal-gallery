<?php
use Firebase\JWT\JWT;

require "../config/connection.php";
require "../../vendor/autoload.php";

use Firebase\JWT\Key;
class UserModel
{
    public static function findId($id) {
        global $conn; 

        $sql = $conn->prepare("SELECT * FROM users WHERE id = ?");
        $sql->bind_param("i", $id);

        if (!$sql->execute()) {
            return false;
        }
        $result = $sql->get_result()->fetch_assoc();
        return $result;
    }
    public static function findEmail($email) {
        global $conn; 

        $sql = $conn->prepare("SELECT * FROM users WHERE email = ?");
        $sql->bind_param("s", $email);

        if (!$sql->execute()) {
            return false;
        }
        $result = $sql->get_result()->fetch_assoc();
        return $result;
    }

    public static function create ($data) {
        global $conn; 

        $sql = $conn->prepare("INSERT INTO users (username,email,password) VALUES (?,?,?)");
        $sql->bind_param("sss",$data['username'],$data['email'],$data['password']);

        if (!$sql->execute()) {
            return false;
        }
        return true;
    }
    public static function checkAuth($id) {
        global $conn; 

        $sql = $conn->prepare("SELECT * FROM users WHERE id = ?");
        $sql->bind_param("i",$id);
        
        if (!$sql->execute()) {
            return false;
        }
        $result = $sql->get_result()->fetch_assoc();
        return $result;
    }
    public static function checkPassword($data) {
        global $conn; 

        $sql = $conn->prepare("SELECT * FROM users WHERE email = ?");
        $sql->bind_param("s", $data['email']);

        if (!$sql->execute()) {
            return false;
        }
        $result = $sql->get_result()->fetch_assoc();
        $password_from_db = $result['password'];
        
        if (!password_verify($data['password'],$password_from_db)) {
            return false;
        }
        return true;
    }
     public static function generateAuthToken($user_id)
    {
        global $conn;

        $secret_key = JWT_SECRET;
        $payload = [
            "user_id" => $user_id,
            "exp" => time() + 3600
        ];

        $token = JWT::encode($payload, $secret_key, 'HS256');

        $sql = $conn->prepare("UPDATE users SET auth_token = ? WHERE id = ?");
        $sql->bind_param("si", $token, $user_id);
        $sql->execute();

        return $token;
    }

   public static function verifyToken($token)
    {
        global $conn;

        $secret_key = JWT_SECRET;
        try {
            $decoded = JWT::decode($token,new key($secret_key,'HS256'));

            
            $user_id = $decoded->user_id;

            $sql = $conn->prepare("SELECT id FROM users WHERE id = ? AND auth_token = ?");
            $sql->bind_param("is", $user_id, $token);
            $sql->execute();

            return $sql->get_result()->num_rows > 0;
        } catch (Exception $e) {
            return false;
        }
    }
}
