<?php
	require_once "DB_settings.php";
	
	$Nickname = (isset($_POST['nickname'])?$_POST['nickname']:'*');
   
    if ($Nickname== '*') die('Nickname must be set');
    if (!preg_match('/^[a-z0-9]{6,12}$/i', $Nickname)) die('Nickname must be alphanumeric, 6-12 in length');
    //Connect to Database Server
    $connection = mysql_connect(DB_HOST,DB_USER,DB_PSW) or die(mysql_error());

	//Select Database	
    mysql_select_db(DB_NAME) or die (mysql_error());

	$qry = "SELECT count(*) as total from tbl_users where user_is_active = 1 and user_nickname = '$Nickname'";

	//echo $qry."\n";	    
	$res = mysql_query($qry) or die(mysql_error());  
	
	$row = mysql_fetch_array($res, MYSQL_ASSOC);
		
	if ($row['total'] > 0) echo "User is already registered";
	else echo "valid";
	
/* Close connection */
    mysql_close($connection);

?>
