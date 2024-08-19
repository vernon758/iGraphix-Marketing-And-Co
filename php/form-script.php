<?php
    $EmailFrom = "no-reply@yourdomain.com"; // Use a valid from address
    $EmailTo = "info@igraphixmarketingand.co"; // Replace this with your email address
    $Subject = "Contact form subject";
    
    // Sanitize and validate input
    $Name = filter_var(Trim($_POST['Name']), FILTER_SANITIZE_STRING); 
    $Tel = filter_var(Trim($_POST['Tel']), FILTER_SANITIZE_STRING); 
    $Email = filter_var(Trim($_POST['Email']), FILTER_SANITIZE_EMAIL);
    $Message = htmlspecialchars(Trim($_POST['Message'])); 

    // Validation
    $validationOK = true;
    if (empty($Name) || empty($Email) || !filter_var($Email, FILTER_VALIDATE_EMAIL) || empty($Message)) {
        $validationOK = false;
    }

    if (!$validationOK) {
        print "<meta http-equiv=\"refresh\" content=\"0;URL=//".$_SERVER['SERVER_NAME']."/pages/error.html\">";
        exit;
    }

    // Prepare email body text
    $Body = "Name: $Name\n";
    $Body .= "Tel: $Tel\n";
    $Body .= "Email: $Email\n";
    $Body .= "Message: $Message\n";

    // Email headers
    $headers = "From: $Name <$Email>" . "\r\n" .
               "Reply-To: $Email" . "\r\n";
    
    // Send email
    $success = mail($EmailTo, $Subject, $Body, $headers);

    // Redirect to success or error page 
    if ($success){
        print "<meta http-equiv=\"refresh\" content=\"0;URL=//".$_SERVER['SERVER_NAME']."/pages/thank-you.html\">";
    }
    else{
        print "<meta http-equiv=\"refresh\" content=\"0;URL=//".$_SERVER['SERVER_NAME']."/pages/error.html\">";
    }
?>