<?php

require_once getcwd() . "/api/dbConfig.php";
require_once getcwd() . "/api/Response.php";


class Database
{
    // Hold the class instance.
    private static $instance = null;
    public static $connection;
    private static $config = null;


    // The db connection is established in the private constructor.
    private function __construct()
    {
        if (!self::$connection) {
            // $config = new Config();
            if (self::$config == null)
                throw new Error("No config for db provided");

            try {
                self::$connection = new mysqli(self::$config->host, self::$config->user, self::$config->password, self::$config->database);
            }
            catch(Exception $e)
            {
                Response::errorResponse("DB connection error", $e->getMessage(), 500);
            }
        }
    }

    public static function getInstance()
    {
        if (!self::$instance) {
            self::$instance = new Database();
        }

        return self::$instance;
    }

    public function getConnection()
    {
        return self::$connection;
    }

    public static function useConfig(DBconfig $config)
    {
        self::$config = $config;
    }
}

if (USE_LOCAL_DB)
{
    require_once getcwd()."/api/localDBconfig.php";
}
else
{
    require_once getcwd()."/api/remoteDBconfig.php";
}

Database::useConfig($dbConfig);