<?php
    require_once "DB_settings.php";
	session_start();    
    $user_id = (isset($_SESSION['user_id']) ? $_SESSION['user_id'] : "*");
    $post_topic = (isset($_POST['post_topic'])?$_POST['post_topic']:'*');
    $post_body = (isset($_POST['post_body'])?$_POST['post_body']:'*');
    $post_category= (isset($_POST['post_category'])?$_POST['post_category']:'*');

    if ($user_id == '*') die('The session is not tied to any user');
    if ($post_topic == '*') die('Post topic cannot be empty.');
    if ($post_category == '*') die('Post category cannot be empty.');
    if ($post_body == '*') die('Post body cannot be empty.');
    	
    //Connect to Database Server
    $connection = mysql_connect(DB_HOST,DB_USER,DB_PSW) or die(mysql_error());

	//Select Database
    mysql_select_db(DB_NAME) or die (mysql_error());

	$qry = "INSERT INTO tbl_posts (posts_user_id, posts_description, posts_body, posts_category_id, posts_create_datetime)
			VALUES($user_id, '$post_topic', '$post_body', $post_category, NOW())";

	//echo $qry."\n";	    
	$res = mysql_query($qry) or die(mysql_error());  
	
	$row = mysql_fetch_array($ffetch, MYSQL_ASSOC);
	
	//~ print_r($row);
	

/* Close connection */
    mysql_close($connection);

?>
