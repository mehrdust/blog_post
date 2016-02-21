<?php
    require_once "DB_settings.php";
	
	session_start();	
	$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : "0";
	if ($user_id == '0') die('Session has expired; Update process failed ');
	
	$image_path = 	(isset($_POST['image_path'])?$_POST['image_path']:'*');	
	$first_name = 	(isset($_POST['first_name'])?$_POST['first_name']:'*');	
	$last_name = 	(isset($_POST['last_name'])?$_POST['last_name']:'*');	
	$country =	 	(isset($_POST['country'])?$_POST['country']:'*');	
	$dob = 			(isset($_POST['dob'])?$_POST['dob']:'*');	
	$contact_no = 	(isset($_POST['contact_no'])?$_POST['contact_no']:'*');	
	$email_address= (isset($_POST['email_address'])?$_POST['email_address']:'*');	
	$web_page = 	(isset($_POST['web_page'])?$_POST['web_page']:'*');		  
	$biography = 	(isset($_POST['biography'])?$_POST['biography']:'*');		  

    //Connect to Database Server
    $connection = mysql_connect(DB_HOST,DB_USER,DB_PSW) or die(mysql_error());

	//Select Database
    mysql_select_db(DB_NAME) or die (mysql_error());
	$qry = "SELECT COUNT(*) CNT FROM tbl_profile WHERE profile_user_id = $user_id";
	//~ echo $qry;
	
	$res = mysql_query($qry) or die(mysql_error());  	
	$row = mysql_fetch_array($res, MYSQL_ASSOC);	
	
	if ($row['CNT'] == '0') {
	
		$qry = "INSERT INTO tbl_profile (
					profile_user_id,
					profile_DOB,
					profile_email,
					profile_location,
					profile_photo,
					profile_contactNo,
					profile_biography,
					profile_webpage)					
				VALUES (
					$user_id,
					'$dob',
					'$email_address',
					'$country',
					'$image_path',
					'$contact_no',
					'$biography',
					'$web_page')";
	} else 
	{
		$qry = "UPDATE tbl_profile
					SET 
						profile_DOB = '$dob',
						profile_email = '$email_address',
						profile_location = '$country',
						profile_photo = '$image_path',
						profile_contactNo = '$contact_no',
						profile_webpage = '$web_page',
						profile_biography = '$biography'
					WHERE
						profile_user_id = $user_id";
	}					


	//~ echo $qry."\n";	    
	$res = mysql_query($qry) or die(mysql_error());  
	
	// updates the session variable for user's profile image
	session_start();
	$session['user_image'] = isset($image_path) ? $image_path : "0";
	//~ echo "****************|".$session['user_image']."|***************";

	$row = mysql_fetch_array($ffetch, MYSQL_ASSOC);
	
	//~ print_r($row);
	echo "{'success':true, 'reason': 'successfully updated the profile'}";
	
	/* Close connection */
    mysql_close($connection);

?>
