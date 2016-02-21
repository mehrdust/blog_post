<?php
	require_once "DB_settings.php";
        
    // Get the requested page. By default grid sets this to 1. 
	$page = (isset($_GET['page'])?$_GET['page']:'1'); 
	//~ echo "page: $page";	

	// get how many rows we want to have into the grid - rowNum parameter in the grid 
	$limit = (isset($_GET['limit'])?$_GET['limit']:'10'); 
	
	//~ echo "limit: $limit";
	
	// Get the starting position
    $start = (isset($_GET['start'])?$_GET['start']:'1');
    //~ echo "Start: $start";
    
    // calculate the starting position of the rows 
	$start = $limit * $page - $limit;
	
	// check if this is meant for 1 specific user or for all users
	$user_id = (isset($_GET['user_id'])?$_GET['user_id']:'*');
	if ($user_id != '*') 
		$srch_qry = " AND B.user_id = $user_id ";
	else $srch_qry = ' ';
	    
    //Connect to Database Server
    $connection = mysql_connect(DB_HOST,DB_USER,DB_PSW) or die(mysql_error());

	//Select Database
    mysql_select_db(DB_NAME) or die (mysql_error());
    $tbl_name = 'tbl_posts';
    
	// calculate the number of rows for the query. We need this for paging the result 
	$qry = "SELECT COUNT(*) AS count 
			FROM $tbl_name  A
				INNER JOIN tbl_users B
					ON A.posts_user_id = B.user_id		
			WHERE A.posts_deleted <> 1 							
			AND B.user_is_active <> 0
			$srch_qry";
	
	//~ echo $qry."\n*****************************\n";

	$result = mysql_query($qry) or die(mysql_error());   

	$row = mysql_fetch_array($result,MYSQL_ASSOC); 
	$count = $row['count']; 
	if ($start > $count) $start = $start - $limit;
	//~ print_r($row);
	//~ echo "\nCount: $count \n **************\n";
	
    $return_arr = array();


	    $qry = "SELECT  posts_id, posts_description, posts_user_id, posts_body, posts_create_datetime, 
						(select COUNT(posts_id)  from tbl_posts) as CNT,
						user_nickname, user_firstname, user_lastname, user_email, post_category_name, 
						post_category_detail, COUNT(reply_post_id) AS posts_replycount,
						profile_photo, profile_DOB, profile_email, profile_location, profile_biography, profile_contactNo, profile_webpage
					FROM tbl_posts  A 						
						INNER JOIN tbl_users B
							ON A.posts_user_id = B.user_id
						INNER JOIN tbl_post_category C
							ON A.posts_category_id = C.post_category_id
						LEFT JOIN tbl_profile D
							ON A.posts_user_id = D.profile_user_id					
						LEFT JOIN tbl_posts_reply E
							ON A.posts_id = E.reply_post_id	
						
					WHERE A.posts_deleted <> 1 					
					AND B.user_is_active <> 0
					$srch_qry					
					GROUP BY A.posts_id
					ORDER BY `posts_create_datetime` 
					DESC LIMIT $start , $limit ";
		//~ echo $qry;	
		$ffetch = mysql_query($qry) or die(mysql_error());  

	/* Retrieve and store in array the results of the query.*/
		while ($row = mysql_fetch_array($ffetch, MYSQL_ASSOC)) {
			//~ print_r($row);
			
			$row_array['posts_id'] = $row['posts_id'];
			$row_array['posts_user_id'] = $row['posts_user_id'];
			$row_array['posts_username'] = $row['user_nickname'];
			$row_array['posts_description'] = $row['posts_description'];
			$row_array['posts_body'] = $row['posts_body'];
			$row_array['posts_replycount'] = $row['posts_replycount'];
			$row_array['posts_viewcount'] = getViewCount($row['posts_id']);
			$row_array['posts_category'] = $row['post_category_name'];
			
			$row_array['profile_photo'] = (isset($row['profile_photo'])?$row['profile_photo']:'0');
			$row_array['profile_photo'] = ($row_array['profile_photo'] =='')?'0':$row_array['profile_photo'];			
			
			$row_array['posts_create_datetime'] = strtotime($row['posts_create_datetime']);
			
			//~ print_r($row_array);
			//~ echo "\n****************************\n";	

			array_push($return_arr,$row_array);
		}		
			
/* Close connection */
    mysql_close();
    
	//~ print_r($return_arr);
	echo "({\"total\": $count, \"topics\":".json_encode($return_arr)."})";
	
	exit (0);


function getViewCount($post_id) {
	$qry = "SELECT  COUNT(view_post_id) AS cnt
			FROM tbl_posts_viewed
				WHERE view_post_id = $post_id";
	//~ echo $qry;
	$result = mysql_query($qry) or die(mysql_error());  
	
	$row = mysql_fetch_array($result,MYSQL_ASSOC); 
	//~ print_r($row);
	if (isset($row['cnt'])) return $row['cnt'];
	else return 0;
	
				
}	

?>
