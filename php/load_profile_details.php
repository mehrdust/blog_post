<?php
	require_once "DB_settings.php";
		
	session_start();
	
	//~ echo $_SESSION['user_id'];
	
	$USER_ID = (isset($_POST['user_id'])?$_POST['user_id']:$_SESSION['user_id']);
	if (!(isset($USER_ID)) ) die ('user is not specified'); 
    //Connect to Database Server
    $connection = mysql_connect(DB_HOST, DB_USER, DB_PSW) or die(mysql_error());
	
	//~ echo "user id: $USER_ID";
	//Select Database
    mysql_select_db(DB_NAME) or die (mysql_error());

	$qry = "SELECT user_nickname, user_firstname, user_lastname, profile_DOB, profile_email, profile_location, profile_biography, profile_contactNo, profile_webpage, profile_photo 
			FROM tbl_users
				LEFT JOIN tbl_profile
				ON tbl_users.user_id = tbl_profile.profile_user_id
			WHERE user_is_active = 1 
			AND user_id = $USER_ID
			LIMIT 1";

	//~ echo $qry."\n";	    
	$res = mysql_query($qry) or die(mysql_error());  
	
	$row = mysql_fetch_array($res, MYSQL_ASSOC);	
	
	//~ $prof_photo =  ($row['profile_photo'] =='')? echo "***|empty|***************\n";
	//~ else echo "not empty ******************\n";
	
	$arr['user_nickname'] = $row['user_nickname'];
	$arr['user_firstname'] = $row['user_firstname'];
	$arr['user_lastname'] = $row['user_lastname'];
	$arr['profile_DOB'] = $row['profile_DOB'];
	$arr['profile_email'] = $row['profile_email'];
	$arr['profile_location'] = $row['profile_location'];
	$arr['profile_biography'] = $row['profile_biography'];
	$arr['profile_contactNo'] = $row['profile_contactNo'];
	$arr['profile_webpage'] = $row['profile_webpage'];
	// This will make sure that profile_photo is not sent as null
	$arr['profile_photo'] = ((($row['profile_photo']=='') || (!isset($row['profile_photo'])))?"0":$row['profile_photo']);
	
	
	//~ print_r($result);
	echo json_encode($arr);
	
/* Close connection */
    mysql_close($connection);

?>
