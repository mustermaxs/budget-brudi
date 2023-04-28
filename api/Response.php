<?php
error_reporting(E_ALL);


class Response
{
    public static function successResponse(string $message, $data = null, $statusCode = 200)
    {
        header('Content-Type: application/json');
        echo json_encode([
            'status' => 'success',
            'message' => $message,
            'data' => $data,
            'statuscode' => $statusCode
        ]);
        exit();
    }

    public static function errorResponse(string $message, $data = null, $statusCode = 400)
    {
        header('Content-Type: application/json');
        echo json_encode([
            'status' => 'error',
            'message' => $message,
            'statuscode' => $statusCode
        ]);
        exit();
    }
}