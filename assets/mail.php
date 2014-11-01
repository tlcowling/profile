<?php
	
	
	/* Simple contact form created by Curt Ziegler / Cudazi */


	/*
	*	START CONFIGURATION * * * * * * * * * *
	*/
	
	// TO email address
	$send_to 				= 	'enquiries@tlcowling.com';
	
	// Form field data and names
	$name 					= 	stripslashes(strip_tags($_POST["cf_name"]));
	$email 					= 	stripslashes(strip_tags($_POST["cf_email"]));
	$dummy_email 			= 	stripslashes(strip_tags($_POST["cf_email_2"]));
	$message 				= 	stripslashes(strip_tags($_POST["cf_message"]));
	
	// Text to display for users with JavaScript disabled if the page is posted to directly vs AJAX
	$noscript_sent = "<p>Message Sent!</p>";
	$noscript_error = "<p>There has been an error, please go back and resubmit the form.</p>";
	$noscript_general_message = "<noscript><p>This message is being displayed because you do not have JavaScript enabled.</p></noscript>";
	
	/*
	*	END CONFIGURATION * * * * * * * * * * *
	*/
	
	
	
	
	
	// Error flag used to decide whether or not to send the message
	$hasErrors = false;
	
	// Check if name, email and message are filled out.
	if(empty($name) || empty($email) || empty($message))
	{
		$hasErrors = true;
	}else{
		// Check if email is a valid email
		if(preg_match("/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/", $email) == 1) {
			$hasErrors = false;
		}else{
			$hasErrors = true;
		}
	}

	// $dummy_email is a hidden dummy email field. If it is filled out, it's spam and ignore
	if(empty($dummy_email))
	{
		if($hasErrors == false)
		{
			// Include an excerpt in the subject line
			$excerpt = " " . substr($message, 0, 20) . "...";
			
			$to = $send_to; // pulled from above to make it easier to edit.
			$from = $email;
			$subject = 'Contact Form - ' . $excerpt;
			$headers = "From: ".$from." \r\n" . "Reply-To: ".$email;
			
			$body = "\nContact Form Message\n\n";
			$body .= "From: " . $name . " (".$_POST['cf_email'].")\n";
			$body .= "Email: " . $email . "\n";
			$body .= "\nMessage:\n" . $message . "\n\n";
			$body .= "IP: ". $_SERVER['REMOTE_ADDR'] . " ". $_SERVER['SERVER_NAME'] . "\n";
			
			// Send
			mail($to,$subject,$body,$headers);
		}
	}else{ /* hidden dummy email field was filled out so it's spam */ }

	// Messages to display if page is loaded directly vs AJAX(no JavaScript)
	if( $hasErrors == false ) { 
		echo $noscript_sent;
	}else{
		echo $noscript_error;
	}
	echo $noscript_general_message;
?>
