<?php
use Firebase\JWT\JWT;
<<<<<<< HEAD

require "../config/connection.php";
require "../../vendor/autoload.php";

use Firebase\JWT\Key;
class UserModel
{
    public static function findId($id) {
        global $conn; 

        $sql = $conn->prepare("SELECT * FROM users WHERE id = ?");
=======
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
>>>>>>> 2cd8d5944363261982ac67198fa4aca1643efbc3
        $sql->bind_param("i", $id);

        if (!$sql->execute()) {
            return false;
        }
<<<<<<< HEAD
        $result = $sql->get_result()->fetch_assoc();
        return $result;
    }
    public static function findEmail($email) {
        global $conn; 

        $sql = $conn->prepare("SELECT * FROM users WHERE email = ?");
=======
        return $sql->get_result()->fetch_assoc();
    }

    public function findEmail($email) {
        $sql = $this->conn->prepare("SELECT * FROM users WHERE email = ?");
>>>>>>> 2cd8d5944363261982ac67198fa4aca1643efbc3
        $sql->bind_param("s", $email);

        if (!$sql->execute()) {
            return false;
        }
<<<<<<< HEAD
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
=======
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
>>>>>>> 2cd8d5944363261982ac67198fa4aca1643efbc3
        
        if (!$sql->execute()) {
            return false;
        }
<<<<<<< HEAD
        $result = $sql->get_result()->fetch_assoc();
        return $result;
    }
    public static function checkPassword($data) {
        global $conn; 

        $sql = $conn->prepare("SELECT * FROM users WHERE email = ?");
=======
        return $sql->get_result()->fetch_assoc();
    }

    public function checkPassword($data) {
        $sql = $this->conn->prepare("SELECT * FROM users WHERE email = ?");
>>>>>>> 2cd8d5944363261982ac67198fa4aca1643efbc3
        $sql->bind_param("s", $data['email']);

        if (!$sql->execute()) {
            return false;
        }
        $result = $sql->get_result()->fetch_assoc();
<<<<<<< HEAD
        $password_from_db = $result['password'];
        
        if (!password_verify($data['password'],$password_from_db)) {
=======
        
        if (!password_verify($data['password'], $result['password'])) {
>>>>>>> 2cd8d5944363261982ac67198fa4aca1643efbc3
            return false;
        }
        return true;
    }
<<<<<<< HEAD
     public static function generateAuthToken($user_id)
    {
        global $conn;

=======

    public function generateAuthToken($user_id) {
>>>>>>> 2cd8d5944363261982ac67198fa4aca1643efbc3
        $secret_key = JWT_SECRET;
        $payload = [
            "user_id" => $user_id,
            "exp" => time() + 3600
        ];

        $token = JWT::encode($payload, $secret_key, 'HS256');

<<<<<<< HEAD
        $sql = $conn->prepare("UPDATE users SET auth_token = ? WHERE id = ?");
=======
        $sql = $this->conn->prepare("UPDATE users SET auth_token = ? WHERE id = ?");
>>>>>>> 2cd8d5944363261982ac67198fa4aca1643efbc3
        $sql->bind_param("si", $token, $user_id);
        $sql->execute();

        return $token;
    }

<<<<<<< HEAD
   public static function verifyToken($token)
    {
        global $conn;

        $secret_key = JWT_SECRET;
        try {
            $decoded = JWT::decode($token,new key($secret_key,'HS256'));

            
            $user_id = $decoded->user_id;

            $sql = $conn->prepare("SELECT id FROM users WHERE id = ? AND auth_token = ?");
=======
    public function verifyToken($token) {
        $secret_key = JWT_SECRET;
        try {
            $decoded = JWT::decode($token, new Key($secret_key, 'HS256'));
            $user_id = $decoded->user_id;

            $sql = $this->conn->prepare("SELECT id FROM users WHERE id = ? AND auth_token = ?");
>>>>>>> 2cd8d5944363261982ac67198fa4aca1643efbc3
            $sql->bind_param("is", $user_id, $token);
            $sql->execute();

            return $sql->get_result()->num_rows > 0;
        } catch (Exception $e) {
            return false;
        }
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> 2cd8d5944363261982ac67198fa4aca1643efbc3
