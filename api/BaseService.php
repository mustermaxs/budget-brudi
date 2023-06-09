<?php

require_once getcwd() . "/api/database.php";
require_once getcwd() . "/api/ServiceResponse.php";

class BaseService
{
    protected Database $db;
    protected $conn;
    public function __construct()
    {
        $this->db = Database::getInstance();
        $this->conn = $this->db->getConnection();
    }
}
