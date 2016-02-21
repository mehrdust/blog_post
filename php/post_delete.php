<?php
    require_once "DB_settings.php";

    $post_id = (isset($_POST['post_id'])?$_POST['post_id']:'*');
    if ($post_id == '*') die('The post ID is not valid. Please try again');
    	
    //Connect to Database Server
    $connection = mysql_connect(DB_HOST,DB_USER,DB_PSW) or die(mysql_error());

	//Select Database
    mysql_select_db(DB_NAME) or die (mysql_error());

	$qry = "UPDATE tbl_posts SET posts_deleted = 1
			WHERE posts_id = $post_id";

	echo $qry."\n";	    
	$res = mysql_query($qry) or die(mysql_error());  
	
	//~ $row = mysql_fetch_array($ffetch, MYSQL_ASSOC);
	
	//~ print_r($row);
	

/* Close connection */
    mysql_close($connection);

?>
