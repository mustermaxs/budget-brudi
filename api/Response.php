<?php


class Response
{
    public static function successResponse(string $message, $data = null, $statusCode = 200)
    {
        header('Content-Type: application/json');
        echo json_encode([
            'status' => 'success',
            'message' => $message,
            'data' => $data,
            'status' => $statusCode
        ]);
        exit();
    }

    public static function errorResponse(string $message, $data = null, $statusCode = 400)
    {
        if (!DISPLAY_DB_ERRORS)
            $data = null;
            
        header('Content-Type: application/json');
        echo json_encode([
            'status' => 'error',
            'message' => $message,
            'status' => $statusCode,
            'data' => $data
        ]);
        exit();
    }
}