<?php

    $EmailFrom = "email@example.com"; // The from address
    $EmailTo = "yourmail@example.com"; // The recipient address (your own email address)
    $Subject = "Contact form subject"; // Shows as your email subject, change this for your own purposes
    $Name = Trim(stripslashes($_POST['Name'])); 
    $Tel = Trim(stripslashes($_POST['Tel'])); 
    $Email = Trim(stripslashes($_POST['Email']));
    $Message = Trim(stripslashes($_POST['Message'])); 

// validation
$validationOK=true;
if (!$validationOK) {
  print "<meta http-equiv=\"refresh\" content=\"0;URL=error.htm\">";
  exit;
}

// prepare email body text
$Body = "";
$Body .= "Name: ";
$Body .= $Name;
$Body .= "\n";
$Body .= "Tel: ";
$Body .= $Tel;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $Email;
$Body .= "\n";
$Body .= "Message: ";
$Body .= $Message;
$Body .= "\n";

// send email
$success = mail($EmailTo, $Subject, $Body, "From: <$EmailFrom>");

// redirect to success page 
if ($success){
  print "<meta http-equiv=\"refresh\" content=\"0;URL=//".$_SERVER['SERVER_NAME']."/pages/thank-you.html\">";
}
else{
  print "<meta http-equiv=\"refresh\" content=\"0;URL=//".$_SERVER['SERVER_NAME']."/pages/error.html\">";
}
?>