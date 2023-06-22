<?php

define("DISPLAY_DB_ERRORS", true);
define("USE_LOCAL_DB", true);
define("AUTHENTICATE", true);
define("NO_AUTH", false);

require_once "./api/router.php";
require_once getcwd() . "/api/Authenticator.php";
require_once getcwd() . "/api/Response.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE, PATCH");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, loadingAnim");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// TODO sollte Router machen

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
$router->post("/api/login", NO_AUTH);
$router->get("/api/users/:id[i]", AUTHENTICATE);
$router->post("/api/users", NO_AUTH);
$router->put("/api/users/:id[i]", AUTHENTICATE);

$router->get("/api/transactions/:type[a]", AUTHENTICATE);
$router->get("/api/transactions/:type[a]/:id[i]", AUTHENTICATE);
$router->get("/api/transactions/summary/:summary[a]", AUTHENTICATE);
$router->post("/api/transactions", AUTHENTICATE);
$router->get("/api/transactions", AUTHENTICATE);
$router->put("/api/transactions/:type[a]/:id[i]", AUTHENTICATE);

$router->get("/api/goals", AUTHENTICATE);
$router->get("/api/goals/:id[i]", AUTHENTICATE);
$router->put("/api/goals/:id[i]", AUTHENTICATE);
$router->put("/api/goals", AUTHENTICATE); //Test Route
$router->post("/api/goals", AUTHENTICATE);
$router->delete("/api/goals/:id[i]", AUTHENTICATE);

$router->post("/api/register", NO_AUTH);

$router->get("/api/categories", NO_AUTH);
$router->get("/api/categories/:id[i]", NO_AUTH);

$router->get("/api/accounts/:id[i]", AUTHENTICATE);
$router->get("/api/accounts/:id[i]/mode/:method[a]", AUTHENTICATE); // e.g. by date


$router->get("/api/savings", AUTHENTICATE);
$router->put("/api/savings", AUTHENTICATE);

$router->dispatch($url, $method);
