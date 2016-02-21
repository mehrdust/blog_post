<?php
    require_once "DB_settings.php";
//~ 
    $Email = (isset($_POST['email'])?$_POST['email']:'*');
    $Nickname = (isset($_POST['nickname'])?$_POST['nickname']:'*');
    $Firstname = (isset($_POST['first'])?$_POST['first']:'*');
    $Lastname = (isset($_POST['last'])?$_POST['last']:'*');
    $Password = (isset($_POST['password'])?$_POST['password']:'*');
    //~ $Email = 'mehrdust@gmail.com';
    //~ $Nickname = 'mehrdust';
    //~ $Firstname = 'reza';
    //~ $Lastname = 'samimi';
    //~ $Password = 'password';

    if ($Email== '*') die('Email must be set');
    if ($Nickname== '*') die('Nickname must be set');
    //~ if ($Firstname== '*') die('Firstname must be set');
    if ($Password== '*') die('Password must be set');
    //~ if ($Lastname== '*') die('Lastname is not set');
		
    //Connect to Database Server
    $connection = mysql_connect(DB_HOST,DB_USER,DB_PSW) or die(mysql_error());

	//Select Database
    mysql_select_db(DB_NAME) or die (mysql_error());

	$qry = "INSERT INTO tbl_users (user_nickname,user_firstname,user_lastname,user_email,user_password)
			VALUES('$Nickname','$Firstname','$Lastname','$Email','$Password')";

	//echo $qry."\n";	    
	$res = mysql_query($qry) or die(mysql_error());  
	
	$row = mysql_fetch_array($ffetch, MYSQL_ASSOC);
	
	//~ print_r($row);
	
	/* Close connection */
    mysql_close($connection);

?>
