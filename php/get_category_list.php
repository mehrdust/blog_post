<?php
	require_once "DB_settings.php";
		
    //Connect to Database Server
    $connection = mysql_connect(DB_HOST,DB_USER,DB_PSW) or die(mysql_error());

	//Select Database
    mysql_select_db(DB_NAME) or die (mysql_error());

	$qry = "SELECT * from tbl_post_category";

	//~ echo $qry."\n";	    
	$res = mysql_query($qry) or die(mysql_error());  
	$result = array();
	
	while ($row = mysql_fetch_array($res, MYSQL_ASSOC)) {
		$arr['cat_id'] = $row['post_category_id'];
		$arr['cat_name'] = $row['post_category_name'];
		$arr['cat_detail'] = $row['post_category_detail'];
		
		array_push($result,$arr);
	}
	
	//~ print_r($result);
	echo json_encode($result);
	
/* Close connection */
    mysql_close($connection);

?>
