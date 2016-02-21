<?php
    require_once "DB_settings.php";

    $user_id = (isset($_POST['post_user_id']) ? $_POST['post_user_id'] : "*");
    $post_id = (isset($_POST['post_id'])?$_POST['post_id']:'*');
    $post_topic = (isset($_POST['post_topic'])?$_POST['post_topic']:'*');
    $post_body = (isset($_POST['post_body'])?$_POST['post_body']:'*');

    if ($user_id == '*') die('The user is not specified. Please try again');
    if ($post_id == '*') die('The post ID is not valid. Please try again');
    if ($post_topic == '*') die('Post topic cannot be empty.');
    if ($post_body == '*') die('Post body cannot be empty.');
    	
    //Connect to Database Server
    $connection = mysql_connect(DB_HOST,DB_USER,DB_PSW) or die(mysql_error());

	//Select Database
    mysql_select_db(DB_NAME) or die (mysql_error());

	$qry = "INSERT 
				INTO tbl_posts_reply (
					reply_post_id, 
					reply_user_id, 
					reply_date_time, 
					reply_title, 
					reply_body)
				VALUES (
					$post_id,
					$user_id, 
					NOW(),
					'$post_topic', 
					'$post_body')";

	//~ echo $qry."\n";	    
	$res = mysql_query($qry) or die(mysql_error());  
	
	$row = mysql_fetch_array($ffetch, MYSQL_ASSOC);	
	
	//~ print_r($row);
	
/* Close connection */
    mysql_close($connection);

?>
