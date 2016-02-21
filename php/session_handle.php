<?php
	session_start();
	$session['username'] = isset($_SESSION['username']) ? $_SESSION['username'] : "0";
	$session['user_id'] = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : "0";
	$session['user_fullname'] = isset($_SESSION['user_fullname']) ? $_SESSION['user_fullname'] : "0";
	$session['user_email'] = isset($_SESSION['user_email']) ? $_SESSION['user_email'] : "0";
	$session['user_image'] = isset($_SESSION['user_image']) ? $_SESSION['user_image'] : "0";
	
	echo json_encode($session);
?>
