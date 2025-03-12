<?php
require_once __DIR__ . "/../connection.php";
require_once __DIR__ .  "/QuestionSkeleton.php";

class Question {
    
    public static function createQuestion($question,$answer) {
        $question_skeleton = new QuestionSkeleton($question, $answer);
        return $question_skeleton;
    }
    public static function getAllQuestions() {
        global $conn;

        $sql = "SELECT * FROM questions";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_all(MYSQLI_ASSOC);
            return $row;
        }
        return false;
        
    }
    public static function getSearchedQuestions($search) {
        global $conn;

        $sql = $conn->prepare("SELECT * FROM questions WHERE question LIKE CONCAT ('%',?,'%')");
        $sql->bind_param('s', $search);
        if (!$sql->execute()) {
            return false;
        }
        $result = $sql->get_result()->fetch_all(MYSQLI_ASSOC);
        return $result;
    }
    public static function addQuestion($question) {
        global $conn;

        $sql = $conn->prepare("INSERT INTO questions (question,answer) VALUES (?,?)");
        $sql->bind_param('ss', $question->question, $question->answer);

        if(!$sql->execute()) {
            return false;
        }
        return true;
    }
}