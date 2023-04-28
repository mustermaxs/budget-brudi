<?php
require_once getcwd() . "/api/BaseController.php";

class TestController extends BaseController
{
    protected function init()
    {

    }
    
    public function get()
    {
        Response::successResponse("it worked!!!");
    }
}