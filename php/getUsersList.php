<?php
	require_once "DB_settings.php";
	
	$user_id = (isset($_GET['user_id'])?$_GET['user_id']:"*");
	if ($user_id == '*') die ('User id is not valid');
    
    //Connect to Database Server
    $connection = mysql_connect(DB_HOST,DB_USER,DB_PSW) or die(mysql_error());

	//Select Database
    mysql_select_db(DB_NAME) or die (mysql_error());

	$qry = "SELECT 	user_id, user_nickname, user_firstname, user_lastname, profile_email, profile_location, 
					profile_biography, profile_photo, profile_contactNo, profile_webpage, profile_DOB
			FROM tbl_users A				
				INNER JOIN tbl_profile B
					ON A.user_id = B.profile_user_id				
			WHERE A.user_is_active = 1
			AND A.user_id <> $user_id
			ORDER BY `user_nickname` DESC";

	//~ echo $qry."\n";
	$res = mysql_query($qry) or die(mysql_error());
	$result = array();
	
	while ($row = mysql_fetch_array($res, MYSQL_ASSOC)) {		
		$arr['user_id'] = $row['user_id'];
		$arr['user_nickname'] = $row['user_nickname'];
		$arr['user_firstname'] = $row['user_firstname'];
		$arr['user_lastname'] = $row['user_lastname'];
		$arr['profile_email'] = $row['profile_email'];
		$arr['profile_location'] = $row['profile_location'];
		$arr['profile_biography'] = $row['profile_biography'];
		$arr['profile_photo'] = $row['profile_photo'];
		$arr['profile_contactNo'] = $row['profile_contactNo'];
		$arr['profile_webpage'] = $row['profile_webpage'];
		$arr['profile_DOB'] = $row['profile_DOB'];
		$arr['total_posts'] = getTotalPosts($row['user_id']);
		$arr['total_replies'] = getTotalReplies($row['user_id']);
		$arr['total_views'] = getTotalReplies($row['user_id']);
		
		$last = getLastActivities($row['user_id']);
		$arr['last_view'] = $last['lastView'];
		$arr['last_reply'] = $last['lastReply'];
		
		
		
		array_push($result,$arr);
	}
	
	//~ print_r($result);
	echo json_encode($result);
	
/* Close connection */
    mysql_close($connection);

//****************** HELPER Functions ********************
function getTotalPosts($usrId) {
	$qry = "SELECT COUNT(*) CNT FROM tbl_posts 
			WHERE posts_user_id = $usrId
			AND posts_deleted = 0";

	$res = mysql_query($qry) or die(mysql_error());
	$row = mysql_fetch_array($res, MYSQL_ASSOC);
	
	return $row['CNT'];
}
//*********************************************************
function getTotalReplies($usrId) {
	$qry = "SELECT COUNT(*) CNT FROM tbl_posts_reply A
				INNER JOIN tbl_posts B
					ON A.reply_post_id = B.posts_id
			WHERE A.reply_user_id = $usrId			
			AND B.posts_deleted = 0";

	$res = mysql_query($qry) or die(mysql_error());
	$row = mysql_fetch_array($res, MYSQL_ASSOC);
	
	return $row['CNT'];
}
//*********************************************************
function getTotalViews($usrId) {
	$qry = "SELECT COUNT(*) CNT FROM tbl_posts_viewed A
				INNER JOIN tbl_posts B
					ON A.view_post_id = B.posts_id
			WHERE A.view_user_id = $usrId			
			AND B.posts_deleted = 0";

	$res = mysql_query($qry) or die(mysql_error());
	$row = mysql_fetch_array($res, MYSQL_ASSOC);
	
	return $row['CNT'];
}
//*********************************************************
function getLastActivities($usrId) {
	$qry = "SELECT `reply_date_time` FROM `tbl_posts_reply` ORDER BY `reply_date_time` DESC LIMIT 1";
	$ret = array();
	
	$res = mysql_query($qry) or die(mysql_error());
	$row = mysql_fetch_array($res, MYSQL_ASSOC);
	
	$ret['lastReply'] = $row['reply_date_time'];
	
	$qry = "SELECT `view_date_time` FROM `tbl_posts_viewed` ORDER BY `view_date_time` DESC LIMIT 1";
		
	$res = mysql_query($qry) or die(mysql_error());
	$row = mysql_fetch_array($res, MYSQL_ASSOC);
	
	$ret['lastView'] = $row['view_date_time'];
	
	return $ret;
}		
//*********************************************************

?>
