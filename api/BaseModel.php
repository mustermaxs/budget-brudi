<?php

require_once getcwd() . "/api/database.php";
require_once getcwd() . "/api/ServiceResponse.php";

class BaseModel
{
    protected Database $db;
    protected $conn;
    public function __construct()
    {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }
}
