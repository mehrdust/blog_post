<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

	$FileName = (isset($_FILES['photo']['name'])?$_FILES['photo']['name']:'*');
	if ($FileName == '*') die("{success:false, reason: 'No File to upload'}");

	//print_r($_FILES);
	if ($_FILES['photo']['error']) die("{success:false, reason: '".$_FILES['photo']['error']."'}");

	$extensions = array("jpg","jpeg","gif","png","bmp");
	
	$FileExtension = substr(strrchr($FileName,'.'),1);
	if (!in_array($FileExtension, $extensions)) die("{success:false, reason: 'Image file must be either jpg, jpeg, gif, png, bmp'}");
	
	// this is to restrict the file size to less than 150 k 
	if($_FILES['photo']['size'] > (150000)) die("{success:false, reason: 'File size cannot be more than 150 kb'}");
  
	/************************************
	 * At this point the file is 		*
	 * validated to proceed with upload *
	 ***********************************/
	 	 
	$target_path = "../images/usersProfile/profile_images/";
	$target_filename = md5(date('Y-m-d H:i:s:u')).'.'.$FileExtension;
	//~ $target_filename = strtolower($_FILES['photo']['name']); 
	$temp_file = $_FILES['photo']['tmp_name'];
	//~ die($target_path.$target_filename);
	if(!move_uploaded_file($temp_file, $target_path.$target_filename))
		die("{success:false, reason: 'There was an error uploading the file, please try again!'}");
	else 		
		//~ sleep(1);
		echo "{success:true, file:'".$target_filename."'}";
	
?>

