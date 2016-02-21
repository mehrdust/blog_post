<?php
    require_once "DB_settings.php";

    $post_id = (isset($_POST['postID'])?$_POST['postID']:'*');   
    if ($post_id == '*') die('There is no valid post');
    
	$user_id = (isset($_POST['post_user_id']) ? $_POST['post_user_id'] : "*");
	if ($user_id == '*') die('There is no valid user');


    	
    //Connect to Database Server
    $connection = mysql_connect(DB_HOST,DB_USER,DB_PSW) or die(mysql_error());

	//Select Database
    mysql_select_db(DB_NAME) or die (mysql_error());

	$qry = "SELECT COUNT(*) as cnt
				FROM tbl_posts_viewed 
				WHERE view_post_id = $post_id
				AND view_user_id = $user_id";
	//~ echo $qry;			
	$res = mysql_query($qry) or die(mysql_error());  
	
	$row = mysql_fetch_array($res, MYSQL_ASSOC);	
	
	//~ print_r($row);
	
	if ($row['cnt'] == 0) 				
		$qry = "INSERT 
					INTO tbl_posts_viewed (
						view_post_id,
						view_user_id,
						view_date_time)
					VALUES (
						$post_id,
						$user_id, 
						NOW())";
	else 
		$qry = "UPDATE tbl_posts_viewed
					SET view_date_time = NOW()
					WHERE view_post_id = $post_id
					AND view_user_id = $user_id";

	//~ echo $qry."\n";	    
	
	$res = mysql_query($qry) or die(mysql_error());  	
	$row = mysql_fetch_array($ffetch, MYSQL_ASSOC);	
	
	//~ print_r($row);
	
/* Close connection */
    mysql_close($connection);

?>
