<?php

require_once getcwd() . "/api/dbConfig.php";

class Database {
    //Hold the class instance.
    private static $instance = NULL;
    public static $connection;

    // The DB connection is established in the private constructor. 
    public function_construct(){

        if(!self::$connection) {
            $config = new Config();
            self::$connection = new mysqli( $config->host,
                                            $config->user,
                                            $config->password,
                                            $config->database);
        }
    }


    public static function getInstance() {
    //  checks if the class has already been instantiated and stored in the static variable $instance
        if (!self::$instance) {
            self::$instance = new Database(); // ... if not new instance of the Database class is created and assigned to $instance
        }

        return self::$instance; 
    }

    public function getConnection(){
        return self::$connection;   //ensures that only one instance of the Database class can exist at any given time
    }
}

