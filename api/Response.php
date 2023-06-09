<?php


class Response
{
    public static function successResponse(string $message, $data = null, $statusCode = 200)
    {
        http_response_code($statusCode);
        header('Content-Type: application/json');
        header('HTTP/1.1 '.$statusCode);
        
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
            
        http_response_code($statusCode);
        header('Content-Type: application/json');
        header('HTTP/1.1 '.$statusCode);
        
        echo json_encode([
            'status' => 'error',
            'message' => $message,
            'data' => $data,
            'status' => $statusCode
        ]);
        exit();
    }
}
