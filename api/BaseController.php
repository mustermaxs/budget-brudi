<?php

abstract class BaseController {

    protected array $request = array();
    protected $model = NULL;

    public function __construct(array $request){ 
// is responsible for initializing an object of the class
// and setting it up with the data provided in the $request parameter.
        $this->request = $request;
        $this->init();                 
    }

    protected function init() {
//to provide a hook for subclasses to perform any additional initialization 
    }

    protected function successResponse($message, $data = null, $statusCode = 200){
        header('Content-Type: application/json');
        echo json_encode([
            'status' => 'success',
            'message' => $message,
            'data' => $data,
            'statuscode' => $statusCode
        ]);
        exit();
    }

    protected function errorResponse($message, $statusCode = 400){
        header('Content-Type: application/json');
        echo json_encode([
            'status' => 'error',
            'message' => $message,
            'statuscode' => $statusCode,
        ]);
        exit();
    }

    protected function getPostData(){
//  to retrieve JSON data that was sent in the request body.

        $postData = file_get_contents('php://input');
        //  read the raw HTTP request body from the input stream
        
        $jsonPostData = json_decode($postData);
        //function is used to decode the JSON data stored in $postData into a PHP object.

        return $jsonPostData;
    }

}