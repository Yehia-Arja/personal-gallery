<?php
require_once __DIR__ . "/../connection.php";

class User {
    public static function addUser($user) {
        global $conn;

        $sql = $conn->prepare("INSERT INTO users (email,username,password) VALUES (?,?,?)");
        $sql->bind_param("sss", $user->email, $user->username, $user->password);

        if (!$sql->execute()) {
            return false;
        }
        return $conn->insert_id;
    }

    public static function checkUser($user) {
        global $conn;

        $sql = $conn->prepare("SELECT * FROM users WHERE email = ?");
        $sql->bind_param("s",$user->email);

        if (!$sql->execute()) {
            return false;
        }
        $result = $sql->get_result();

        if ($result->num_rows>0) {
            $row = $result->fetch_assoc();
            return $row;
        }

        return false;

    }
    public static function verifyUser($user) {
        global $conn;

        $sql = $conn->prepare("SELECT * FROM users WHERE email = ?");
        $sql->bind_param("s", $user->email);

        if (!$sql->execute()) {
            return false;
        }
        $result = $sql->get_result()->fetch_assoc();
        $password_from_db = $result['password'];
        if (!password_verify($user->password,$password_from_db)) {
            return false;
        }
        return $result['id'];
    } 
}