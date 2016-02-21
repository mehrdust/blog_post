<?php
	require_once "DB_settings.php";
	
	$username = (isset($_POST['username'])?$_POST['username']:'*');
	$password = (isset($_POST['password'])?$_POST['password']:'*');
    
    if ($password== '*') die('Failure: No password is specified');
    if ($username== '*') die('Failure: No username is specified');
    
    //Connect to Database Server
    $connection = mysql_connect(DB_HOST,DB_USER,DB_PSW) or die(mysql_error());

	//Select Database
    mysql_select_db(DB_NAME) or die (mysql_error());

	$qry = "SELECT count(*) as total, user_id, user_nickname,user_firstname,user_lastname,user_email, profile_photo 				
				FROM tbl_users LEFT JOIN tbl_profile
				ON tbl_users.user_id = tbl_profile.profile_user_id
				WHERE user_is_active = 1 
				AND user_nickname = '$username' 
				AND user_password = '$password'";

	//~ echo $qry."\n";	    
	$res = mysql_query($qry) or die(mysql_error());  
	
	$row = mysql_fetch_array($res, MYSQL_ASSOC);
		
	if ($row['total'] > 0) {
		$result["success"] = true;
		session_start();
		$_SESSION['username'] = $username;
		$_SESSION['user_id'] = $row['user_id'];
		$_SESSION['user_fullname'] = $row['user_firstname']." ".$row['user_lastname'];
		$_SESSION['user_email'] = $row['user_email'];
		$_SESSION['user_image'] = $row['profile_photo'];
				
		//echo $_SESSION['user']."<br />";
	} else {
		$result['success'] = false;
		$result['reason'] = "Login failed. Try again.";
	}

	echo json_encode($result);

/* Close connection */
    mysql_close($connection);

?>
