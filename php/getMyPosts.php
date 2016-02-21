<?php
	require_once "DB_settings.php";
		
	$user_id = (isset($_GET['user_id'])?$_GET['user_id']:"*");
	if ($user_id == '*') die ('User id is not valid');

    //Connect to Database Server
    $connection = mysql_connect(DB_HOST,DB_USER,DB_PSW) or die(mysql_error());

	//Select Database
    mysql_select_db(DB_NAME) or die (mysql_error());

	$qry = "SELECT 	posts_id, posts_user_id, posts_description, posts_body, posts_create_datetime, post_category_name, 
					user_nickname, user_firstname, user_lastname
			FROM tbl_posts A				
				INNER JOIN tbl_post_category B
					ON A.posts_category_id = B.post_category_id
				INNER JOIN tbl_users C
					ON A.posts_user_id = C.user_id
			WHERE posts_user_id = $user_id
			AND A.posts_deleted = 0
			AND C.user_is_active = 1
			ORDER BY `posts_create_datetime` DESC";

	//~ echo $qry."\n";
	$res = mysql_query($qry) or die(mysql_error());
	$result = array();
	
	while ($row = mysql_fetch_array($res, MYSQL_ASSOC)) {		
		$arr['posts_id'] = $row['posts_id'];
		$arr['posts_user_id'] = $row['posts_user_id'];
		$arr['posts_description'] = $row['posts_description'];
		$arr['posts_body'] = $row['posts_body'];
		$arr['posts_create_datetime'] = $row['posts_create_datetime'];
		$arr['post_category_name'] = $row['post_category_name'];
		$arr['user_nickname'] = $row['user_nickname'];
		$arr['user_firstname'] = $row['user_firstname'];
		$arr['user_lastname'] = $row['user_lastname'];
		
		array_push($result,$arr);
	}
	
	//~ print_r($result);
	echo json_encode($result);
	
/* Close connection */
    mysql_close($connection);

?>
