<?php
require_once getcwd() . "/api/Response.php";
define("AUTHENTICATE", true);
define("NO_AUTH", false);
/**
 * request parameters stored in $request, get with Router::request()
 * add route with get/ put / post / delete
 * variable url parameters can be defined with ":id"
 * eg. /api/user/:id    where "user" is the controller and ":id"
 * a query parameter that will be passed to the controller
 * datatypes can be defined for named url params /:id[i] => id has to be
 * integer [0-9]+, /:id[s] => id has to be string with characters from alphabet [a-z]+
 */

class Router
{
    private string $url;
    private $requestDetails = [];
    private $apiControllerDir = null;
    private $baseURL = null;
    private bool $routeexists = false;
    private array $routes = [
        "GET" => [],
        "POST" => [],
        "PUT" => [],
        "PATCH" => [],
        "DELETE" => []
    ];

    function __construct(string $baseURL = "", string $apiControllerDir)
    {
        if ($baseURL == null || $apiControllerDir == null)
            throw new Error("Router instatiated incorrectly!");

        $this->apiControllerDir = $apiControllerDir;
        $this->baseURL = $baseURL;  // name of webapp (eg. appointment-finder)
    }

    public function get(string $url, bool $doAuthenticate = false)
    {
        $regexPattern = $this->createRegexPattern($url);
        array_push($this->routes["GET"], array("pattern" => $regexPattern,  "authenticate" => $doAuthenticate));
    }

    public function post(string $url, bool $doAuthenticate = false)
    {
        $regexPattern = $this->createRegexPattern($url);
        array_push($this->routes["POST"], array("pattern" => $regexPattern,  "authenticate" => $doAuthenticate));
    }

    public function patch(string $url, bool $doAuthenticate = false)
    {
        $regexPattern = $this->createRegexPattern($url);
        array_push($this->routes["PATCH"], array("pattern" => $regexPattern,  "authenticate" => $doAuthenticate));
    }

    public function put(string $url, bool $doAuthenticate = false)
    {
        $regexPattern = $this->createRegexPattern($url);
        array_push($this->routes["PUT"], array("pattern" => $regexPattern,  "authenticate" => $doAuthenticate));
    }

    public function delete(string $url, bool $doAuthenticate = false)
    {
        $regexPattern = $this->createRegexPattern($url);
        array_push($this->routes["DELETE"], array("pattern" => $regexPattern,  "authenticate" => $doAuthenticate));
    }


    public function createRegexPattern($path)
    {
        $regexPattern = preg_replace("/\//", "\\/", $path);
        $regexPattern = preg_replace('/\:([a-z-]+)(\[a\])/', '(?\'\1\'[A-Za-z-_]+)', $regexPattern);       // match only a-z
        $regexPattern = preg_replace('/\:([a-z-]+)(\[i\])/', '(?\'\1\'[0-9-_]+)', $regexPattern);       // match only integers 0-9+, underline and hyphen
        $regexPattern = preg_replace('/\:([a-z0-9-]+)/', '(?\'\1\'[A-Za-z-_0-9]+)', $regexPattern);        // match character a-z and integers

        // $regexPattern = preg_replace("/\/$/", , $regexPattern);
        $regexPattern = "/^" . $regexPattern . "\/?$/";

        return $regexPattern;
    }
    // checks if requested url matches pattern in $routes ( /controller/[:optionalParams] )
    // if it does, it extracts query params (NOT search query) and stores them
    // in $requestDetails array
    private function resolveRoute(array $patterns, $url): bool
    {
        $route = preg_replace("/(\?[a-z=]+)/", "", $url);
        preg_match("/\/api\/([a-z]+)\/?/", $route, $controller);
        $this->addRequest("controller", $controller[1]);

        foreach ($patterns as $pattern) {
            if (preg_match($pattern["pattern"], $route, $matches)) {
                $namedGroupMatches = array_filter($matches, "is_string", ARRAY_FILTER_USE_KEY);

                $this->addRequest("authenticate", $pattern["authenticate"]);

                foreach ($namedGroupMatches as $key => $value) {
                    $this->addRequest($key, $value);
                }
                return true;
                break;
            }
        }
        return false;
    }

    private function addRequest(string $key, string $value)
    {
        $this->requestDetails[$key] = $value;
    }

    public function routeExists()
    {
        return $this->routeexists;
    }

    public function getRequestMethod()
    {
        return $this->requestDetails["httpmethod"];
    }

    public function request()
    {
        return $this->requestDetails;
    }

    public function successResponse($message, $data = null, $statusCode = 200)
    {
        http_response_code($statusCode);
        header('Content-Type: application/json');
        echo json_encode([
            'status' => 'success',
            'message' => $message,
            'data' => $data,
            'statuscode' => $statusCode
        ]);
        exit();
    }

    public function errorResponse($message, $statusCode = 400)
    {
        http_response_code($statusCode);
        header('Content-Type: application/json');
        echo json_encode([
            'status' => 'error',
            'message' => $message,
            'statuscode' => $statusCode
        ]);
        exit();
    }

    private function initController()
    {
        $controllerClassName = ucfirst($this->requestDetails["controller"]) . "Controller";
        $controllerPath = $this->apiControllerDir . $controllerClassName . ".php";
        $controllerAction = strtolower($this->getRequestMethod());
        $auth = new Authenticator();

        if (!file_exists($controllerPath))
            Response::errorResponse("Route doesn't exist", null, 404);

        if ($this->requestDetails["authenticate"]) {
            if (!$auth->authenticate())
                Response::errorResponse("Unauthorized or token expired", null, 401);
            $this->requestDetails = array_merge($this->requestDetails, $auth->getUserDetails());
        }

        require_once $controllerPath;
        $controller = new $controllerClassName($this->requestDetails);
        $controller->$controllerAction();
    }

    private function handleGetRequest(string $url)
    {
        foreach ($_GET as $key => $value) {
            $this->addRequest($key, $value);
        }
        $this->url = preg_replace('/\\?.*/', '', $url);   // remove optional search query params from url
    }

    private function storeSentData()
    {
        // store all json encoded client data in requestDetails
        $postData = file_get_contents('php://input');
        $jsonPostData = json_decode($postData, TRUE) ?? [];
        $this->requestDetails = array_merge($this->requestDetails, $jsonPostData);
    }

    public function dispatch(string $url, string $requestMethod)
    {
        $this->url = str_replace($this->baseURL, "", $url);   // cut the localhost... part
        $httpMethod = strtoupper($requestMethod);

        // store query params in $requestDetails
        if ($httpMethod == "GET")
            $this->handleGetRequest($this->url);

        $this->storeSentData();

        $this->addRequest("url", $this->url);
        $this->addRequest("httpmethod", $httpMethod);

        if (!$this->resolveRoute($this->routes[$httpMethod], $this->url)) {
            $this->routeexists = false;
            Response::errorResponse("Route doesn't exist", null, 404);
        }
        $this->routeexists = true;

        $this->initController();
    }
}
