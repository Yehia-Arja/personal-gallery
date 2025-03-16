<?php
require "config/connection.php";
require "models/UserModel.php";
header("Content-Type: application/json");
$base_dir = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/');
$request = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if (strpos($request, $base_dir) === 0) {
    $request = substr($request, strlen($base_dir));
}



if ($request == '') {
    $request = '/';
}

$apis = [
    '/login'         => ['controller' => 'UserController', 'method' => 'login'],
    '/signup'    => ['controller' => 'UserController', 'method' => 'signup']
];

if (isset($apis[$request])) {
    $controllerName = $apis[$request]['controller'];
    $method = $apis[$request]['method'];
    require_once "apis/v1/{$controllerName}.php";

    $controller = new $controllerName($conn);
    if (method_exists($controller, $method)) {
        $controller->$method();
    } else {
        echo "Error: Method {$method} not found in {$controllerName}.";
    }
} else {
    echo "404 Not Found";
}