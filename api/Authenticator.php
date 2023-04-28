<?php

declare(strict_types=1);
require_once getcwd() . "/vendor/autoload.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


class Authenticator
{
    private $secretKey = '68V0zWFrS72GbpPreidkQFLfj4v9m3Ti+DXc8OB0gcM=';
    private $domainName = "budget-brudi";
    private int $userId;

    public function __construct()
    {
    }

    public function createToken(string $username, int $userId)
    {

        $currentDate = new DateTimeImmutable();
        $expire_at  = $currentDate->modify('+30 minutes')->getTimestamp();      // Add 60 seconds
        $request_data = [
            'iat'  => $currentDate->getTimestamp(),         // Issued at: time when the token was generated
            'iss'  => $this->domainName,                          // Issuer
            'nbf'  => $currentDate->getTimestamp(),         // Not before
            'exp'  => $expire_at,
            'username' => $username,
            'role' => "admin",
            'userId' => $userId,
            'mood' => "(╯°□°)╯︵ ┻━┻"
        ];

        // ? return token to login controller ?
        return JWT::encode($request_data, $this->secretKey, 'HS512');
    }

    public function getUserId()
    {
        return $this->userId;
    }

    public function authenticate()
    {
        // checks if token was sent along with request
        if (!array_key_exists("REDIRECT_HTTP_AUTHORIZATION", $_SERVER))
        {
            header('HTTP/1.0 400 Bad Request');
            echo 'Token not found in request';
            exit;
        }
        
        if (!preg_match('/Bearer\s(\S+)/', $_SERVER['REDIRECT_HTTP_AUTHORIZATION'], $matches)) {
            header('HTTP/1.0 400 Bad Request');
            echo 'Token not found in request';
            exit;
        }

        $jwt = $matches[1];
        if (!$jwt) {
            // No token was able to be extracted from the authorization header
            header('HTTP/1.0 400 Bad Request');
            echo 'Token not found in request';
        }

        $token = JWT::decode($jwt, new Key($this->secretKey, 'HS512'));
        $now = new DateTimeImmutable();


        if (
            $token->iss !== $this->domainName ||
            $token->nbf > $now->getTimestamp() ||
            $token->exp < $now->getTimestamp()
        ) {
            // TODO Error Handling
            header('HTTP/1.1 401 Unauthorized');
            exit;
        }

        $this->userId = $token->userId;

        return true;
    }
}
