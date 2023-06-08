<?php

// implements logger?
class ServiceResponse
{
    public static array $request = array();
    public static bool $ok = true;
    public static array $data = array();
    public static string $msg = "An error occured";

    public static function fail(Exception $e)
    {
        self::$ok = false;

        if (DISPLAY_DB_ERRORS)
            self::$msg = $e->getMessage();

        return (object) array("ok" => self::$ok, "message" => self::$msg);
    }
    
    
    // Just trying out the error message for having too many goals
    // public static function error($message, $code = 400) {
    //     http_response_code($code);
    //     echo json_encode(["ok" => false, "you have too many goals" => $message]);
    //     exit();
    // }



    public static function success(array $data = null)
    {
        if (self::$ok)
            self::$msg = "";

        return (object) array("ok" => self::$ok, "data" => $data);
    }

    public static function __callStatic($name, $arguments)
    {
        if ($name !== "send")
            throw new Exception("Method " . $name . " doesn't exist");

        if (count($arguments) > 1)
            throw new ArgumentCountError("Too many arguments provided");
        if (count($arguments) != NULL) {
            if ($arguments[0] instanceof Exception) {
                return self::fail($arguments[0]);
            } else {
                return self::success($arguments[0]);
            }
        } else {
            return self::success();
        }
    }
}
