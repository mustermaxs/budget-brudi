<?php

// implements logger?
class ServiceResponse
{
    public static array $request = array();
    public static bool $ok = true;
    public static array $data = array();
    public static string $msg = "An error occured";

    private static function failedWithException(Exception $e)
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



    private static function failedWithCustomMsg(string $msg)
    {
        self::$ok = false;

        return (object) array("ok" => self::$ok, "message" => $msg);
    }


    private static function sendSuccess(array $data = null)
    {
        if (self::$ok)
            self::$msg = "";

        return (object) array("ok" => self::$ok, "data" => $data);
    }

    private static function handleFail($name, $arguments)
    {
        if ($arguments[0] instanceof Exception)
            return self::failedWithException($arguments[0]);

        elseif (is_string($arguments[0]))
            return self::failedWithCustomMsg($arguments[0]);
    }

    public static function __callStatic($name, $arguments)
    {
        if (count($arguments) > 1)
            throw new ArgumentCountError("Too many arguments provided");

        if (count($arguments) != NULL) {
            if ($name == "success") return self::sendSuccess($arguments[0]);
            elseif ($name == "fail") return self::handleFail($name, $arguments);
            elseif ($name == "send");
            else return self::failedWithCustomMsg("called ServiceResponse method doesn'exist '".$name."'");

            if ($arguments[0] instanceof Exception) {
                return self::failedWithException($arguments[0]);
            } else {
                return self::sendSuccess($arguments[0]);
            }
        } else {
            return self::sendSuccess();
        }
    }
}
