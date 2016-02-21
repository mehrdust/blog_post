<?php
	require_once "DB_settings.php";
	$post_id = (isset($_GET['postId'])?$_GET['postId']:"*");
	if ($post_id == '*') die ('Post id is not valid');
	
	// Check whether post type refers to REPLIES or VIEWS
	//~ $post_type = (!isset($_POST['post_type'])?$_POST['post_type']:"*");
	//~ if ($post_type == '*') die ('An error has occured');
	//~ echo "************* $post_id ***********";
    //Connect to Database Server
    $connection = mysql_connect(DB_HOST,DB_USER,DB_PSW) or die(mysql_error());

	//Select Database
    mysql_select_db(DB_NAME) or die (mysql_error());

	$qry = "SELECT reply_title, reply_body, reply_date_time, user_nickname, user_firstname, user_lastname, user_is_active, posts_description,posts_body, posts_create_datetime, posts_deleted, profile_photo
			FROM tbl_posts_reply A
				INNER JOIN tbl_posts B 
					ON A.reply_post_id = B.posts_id
				INNER JOIN tbl_users C 
					ON A.reply_user_id = C.user_id
				INNER JOIN tbl_profile D
					ON C.user_id = D.profile_user_id
			WHERE posts_deleted <> 1
			AND user_is_active = 1
			AND reply_post_id = $post_id";

	//~ echo $qry."\n";	    
	$res = mysql_query($qry) or die(mysql_error());  
	$result = array();
	
	while ($row = mysql_fetch_array($res, MYSQL_ASSOC)) {
		
		$row_array['reply_title'] = $row['reply_title'];
		$row_array['reply_body'] = $row['reply_body'];
		$row_array['reply_date_time'] = $row['reply_date_time'];
		$row_array['user_nickname'] = $row['user_nickname'];
		$row_array['user_firstname'] = $row['user_firstname'];
		$row_array['user_lastname'] = $row['user_lastname'];
		$row_array['user_is_active'] = $row['user_is_active'];
		$row_array['posts_description'] = $row['posts_description'];
		$row_array['posts_body'] = $row['posts_body'];
		$row_array['posts_create_datetime'] = $row['posts_create_datetime'];
		$row_array['posts_deleted'] = $row['posts_deleted'];
		$row_array['replier_profile_photo'] = $row['profile_photo'];
		
		array_push($result,$row_array);
	}
	
	//~ print_r($result);
	echo json_encode($result);
	
/* Close connection */
    mysql_close($connection);

?>
