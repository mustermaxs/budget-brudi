<?php

require_once "./api/router.php";

$url = $_SERVER["REQUEST_URI"];
$method = $_SERVER["REQUEST_METHOD"];
$baseURL = "/budget-brudi";
$apiDir = "./api/controllers/";

$router = new Router($baseURL, $apiDir);

/**
 * id wird nicht angegeben, sollte ohnehin
 * beim login im cookie od. so hinterlegt werden
 * (sonst könnte jeder sensible userdaten getten)
 */
$router->get("/api/test");
$router->post("/api/login/:id[i]");

$router->dispatch($url, $method);
