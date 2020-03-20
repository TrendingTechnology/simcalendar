<?php
include_once('classes/sendmail.php');
include_once('config.php');

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if( empty($_POST['firstName']) && empty($_POST['email']) ) {
    echo json_encode(
        [
           "sent" => false,
           "message" => $SendMailEmptyerrorMessage
        ]
    );
    exit();
}
if ($_POST['organiser'] === true) {
  $organiser = 'yes';
}
if ($_POST){
    //@important: Please change this before using

    http_response_code(200);
    $subject = 'Contact from: ' . $_POST['name'];
    $from = $_POST['email'];
    $message = "
      Name: {$_POST['name']}
      email: {$_POST['email']}
      URL: {$_POST['url']}
      sim: {$_POST['sim']}
      organiser: {$organiser}
      
      message: {$_POST['message']}";
    //Actual sending email
    $sendEmail = new Sender($adminEmail, $from, $subject, $message);
    $sendEmail->send();
} else {
 // tell the user about error
 echo json_encode(
     [
        "sent" => false,
        "message" => $SendMailFailederrorMessage
     ]
 );
}
