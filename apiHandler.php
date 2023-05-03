<?php

require_once "./api/router.php";
require_once getcwd(). "/api/Authenticator.php";
require_once getcwd() . "/api/Response.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE, PATCH");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
  }

$url = $_SERVER["REQUEST_URI"];
$method = $_SERVER["REQUEST_METHOD"];
$baseURL = "/budget-brudi";
$apiDir = "./api/controllers/";

$authenticator = new Authenticator();

$router = new Router($baseURL, $apiDir);

/**
 * id wird nicht angegeben, sollte ohnehin
 * beim login im cookie od. so hinterlegt werden
 * (sonst könnte jeder sensible userdaten getten)
 */

 // true = private api route -> authentication is needed
 // false = public api route  
$router->post("/api/login", false);
$router->get("/api/transactions/:type[a]", true);
$router->get("/api/transactions/:type[a]/:id[i]", true);
$router->post("/api/transactions", true);
$router->get("/api/transactions", true);
$router->get("/api/user", true);
$router->get("/api/goals", true);
$router->get("/api/goals/:id[i]", true);
$router->post("/api/goals", true);
$router->post("/api/register", false);
$router->get("/api/categories", false);
$router->get("/api/categories/:id[i]", false);
$router->get("/api/accounts", true);
$router->get("/api/accounts/:method[a]", true); // e.g. by date

$router->dispatch($url, $method);
