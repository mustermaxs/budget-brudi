<?php
// TODO konstruktor?
class DBconfig
{
    public $host;
    public $user;
    public $password;
    public $database;
    
    public function __construct($host, $user, $pwd, $db)
    {
        $this->host = $host;
        $this->user = $user;
        $this->password = $pwd;
        $this->database = $db;
    }
}
