<?php

declare(strict_types=1);
require_once getcwd() . "/vendor/autoload.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


class Authenticator
{
    private $secretKey = '68V0zWFrS72GbpPreidkQFLfj4v9m3Ti+DXc8OB0gcM=';
    private $domainName = "budget-brudi";
    private array $userDetails;

    public function __construct()
    {
    }

    public function createToken(string $username, int $userId, int $accountId)
    {

        $currentDate = new DateTimeImmutable();
        $expire_at  = $currentDate->modify('+9999 minutes')->getTimestamp();      // Add 60 seconds
        $request_data = [
            'iat'  => $currentDate->getTimestamp(),         // Issued at: time when the token was generated
            'iss'  => $this->domainName,                          // Issuer
            'nbf'  => $currentDate->getTimestamp(),         // Not before
            'exp'  => $expire_at,
            'username' => $username,
            'role' => "admin",
            'userId' => $userId,
            'accountId' => $accountId,
            'mood' => "(╯°□°)╯︵ ┻━┻"
        ];

        // ? return token to login controller ?
        return JWT::encode($request_data, $this->secretKey, 'HS512');
    }

    public function getUserDetails(): array
    {
        return $this->userDetails;
    }

    // checks if token was sent along with request
    private function getTokenFromHeader()
    {
        $jwt = null;

        if (
            !array_key_exists("REDIRECT_HTTP_AUTHORIZATION", $_SERVER) ||
            !preg_match('/Bearer\s(\S+)/', $_SERVER['REDIRECT_HTTP_AUTHORIZATION'], $matches)
        )
            return null;

        $jwt = $matches[1];

        return $jwt;
    }

    public function authenticate()
    {
        $jwt = $this->getTokenFromHeader();

        if (!$jwt) {
            header('HTTP/1.0 400 Bad Request');
            echo 'Token not found in request';
        }

        try {
            $token = JWT::decode($jwt, new Key($this->secretKey, 'HS512'));
        } catch (Exception $e) {
            return false;
        }

        $now = new DateTimeImmutable();

        if (
            $token->iss !== $this->domainName ||
            $token->nbf > $now->getTimestamp() ||
            $token->exp < $now->getTimestamp()
        ) {
            header('HTTP/1.1 401 Unauthorized');
            exit;
        }

        $this->userDetails["userId"] = $token->userId;
        $this->userDetails["accountId"] = $token->accountId;

        return true;
    }
}
