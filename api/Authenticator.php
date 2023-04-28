<?php
declare(strict_types=1);
require_once getcwd(). "/vendor/autoload.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


class Authenticator
{
    private $secretKey = '68V0zWFrS72GbpPreidkQFLfj4v9m3Ti+DXc8OB0gcM=';
    private $domainName = "budget-brudi";

    public function __construct()
    {

    }

    public function createToken(string $username)
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
            'mood' => "(╯°□°)╯︵ ┻━┻"
        ];

        // ? return token to login controller ?
        return JWT::encode($request_data, $this->secretKey,'HS512');
        
    }

    public function authenticate()
    {
        // checks if token was sent along with request
        if (!preg_match('/Bearer\s(\S+)/', $_SERVER['HTTP_AUTHORIZATION'], $matches)) {
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

        $token = JWT::decode($jwt, $this->secretKey, ['HS512']);
        // $now = new DateTimeImmutable();
    }


}