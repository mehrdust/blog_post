<?php
	require_once "DB_settings.php";
		
	$post_id = (isset($_GET['postId'])?$_GET['postId']:"*");
	if ($post_id == '*') die ('Post id is not valid');

    //Connect to Database Server
    $connection = mysql_connect(DB_HOST,DB_USER,DB_PSW) or die(mysql_error());

	//Select Database
    mysql_select_db(DB_NAME) or die (mysql_error());

	$qry = "SELECT view_date_time, user_nickname, user_firstname, user_lastname, user_id
			FROM tbl_posts_viewed A
				INNER JOIN tbl_users B
					ON A.view_user_id = B.user_id
			WHERE view_post_id = $post_id";

	//~ echo $qry."\n";	    
	$res = mysql_query($qry) or die(mysql_error());  
	$result = array();
	
	while ($row = mysql_fetch_array($res, MYSQL_ASSOC)) {		
		$arr['view_date_time'] = $row['view_date_time'];
		$arr['user_nickname'] = $row['user_nickname'];
		$arr['user_firstname'] = $row['user_firstname'];
		$arr['user_lastname'] = $row['user_lastname'];
		$arr['user_id'] = $row['user_id'];
		
		array_push($result,$arr);
	}
	
	//~ print_r($result);
	echo json_encode($result);
	
/* Close connection */
    mysql_close($connection);

?>
