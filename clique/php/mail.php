<?php 
require("mail/PHPMailer.php");
require("mail/SMTP.php");

$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$formcontent="From: $name \n Message: $message";
$recipient = "info@socialclique.nl";
$subject = "Contact Form";

$mail = new PHPMailer;

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.socialclique.nl';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'info@socialclique.com';                 // SMTP username
$mail->Password = 'jk2dbqs4';                           // SMTP password

$mail->From = 'info@socialclique.com';
$mail->FromName = 'website';
$mail->addAddress('info@socialclique.nl', 'info');     // Add a recipient

$mail->WordWrap = 50;                                 // Set word wrap to 50 characters
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = $subject;
$mail->Body    = $message;

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}

header("Location: http://socialclique.nl");
die();
?>