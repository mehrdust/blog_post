function getUsersProfileImage() {	
	//~ var pnlProfileUpdateForm = getUsersProfile();

	var pnlProfileImage = Ext.create('Ext.panel.Panel', {
			//title: 'Hello',
			//collapsible: true,
			//~ draggable:true,
			id: 'pnl_my_profile',
			//~ height: 100,
			flex: 1,
			//~ align: 'middle',
			//html: '<p>World!</p><br /><br /> <b> This is to test the simple panel </b>',
			items : [
				{ // This is the image box under My Profile; Image file upload is handled here
					xtype: 'image',
					id: 'profile_image',					
					title: 'Profile Image',
					//~ src: 'images/no-profile-image.jpeg',					
					//~ autoEl: 'div', // wrap in a div
					listeners: {
						el: {	
							/*******************************************
							 * Here the on click event on the 
							 * image frame is triggered and the 
							 * image file upload window is opened
							 ******************************************/							
							click: function() {	
								var uploader = Ext.create('Ext.Window', {
									title: 'File Upload Form',
									//~ height: 300,
									autosize: true,
									draggable: true,
									autoscroll:true,
									id: 'window_register',
									modal: true,
									headerPosition: 'top',
									layout: 'fit',								
									items: {		
										xtype: 'form',	
										width: 300,
										frame: true,
										//~ title: 'File Upload Form',
										bodyPadding: '10 10 0',
										defaults: {
											anchor: '100%',
											allowBlank: false,
											msgTarget: 'side',
											labelWidth: 50
										},
										items: [{
											xtype: 'filefield',
											id: 'form-file',
											emptyText: 'Select an image',
											fieldLabel: 'Photo',
											validateOnChange: true,
											name: 'photo',											
											buttonText: '',
											imgValid: false,
											buttonConfig: {
												iconCls: 'upload-icon'
											},
											/**************************************************************
											 * this function will validate the selected file for uploader.
											 * the validator will check whether the file is either of the 
											 * following formats: "jpg","jpeg","gif","png","bmp"	
											 * and the file size should not be more than 150 KB (returned 
											 * from profile_image_upload.php 										 
											 **************************************************************/
											validator: function(field) {
												return this.imgValid;
											},
											listeners: {												
												'change': function(textfield, newValue, oldValue) {
													var extensions = ["jpg","jpeg","gif","png","bmp"];

													var image_file = newValue;
													var image_length = newValue.length;
													var pos = image_file.lastIndexOf('.') + 1;
													var ext = image_file.substring(pos, image_length);
													var final_ext = ext.toLowerCase();

													Ext.Array.each(extensions, function(name, index) {
														if (name == ext) {
															console.log('image is valid');
															imgValid = true;
															return false;															
														}
														
														imgValid = "You must upload an image file with one of the following extensions: "+ extensions.join(', ') +".";
													});
													
													//~ if (imgValid===true) alert('ok');
														
													return this.imgValid = imgValid;	
													
												}
											}
										}],
										buttons: [{
											text: 'Save',
											handler: function(){
												var form = this.up('form').getForm();
												if(form.isValid()){
													form.submit({
														url: 'php/profile_image_upload.php',
														waitMsg: 'Uploading your photo...',
														success: function(fp, o) {
															if (o.result.success) {
																//Ext.Msg.alert('Success', 'Processed file "' + o.result.file + '" on the server');
																var siteURL = window.location.protocol + "//" + window.location.host;
																var pathArray =  window.location.pathname.split( '/' );
																siteURL = siteURL + "/" + pathArray[1];
																Ext.getCmp('profile_image').setSrc(siteURL+'/images/usersProfile/profile_images/'+o.result.file);
																Ext.get('thumb_image').dom.src = siteURL+'/images/usersProfile/profile_images/'+o.result.file;
																uploader.close();
																
															}
															else Ext.Msg.alert('File Upload Failed',  o.result.reason);														
															
														},
														failure: function(fp, obj) {
															Ext.Msg.alert('File Upload Failed', obj.result.reason);
														}
														
													});
												}
											}
										},{
											text: 'Reset',
											handler: function() {
												this.up('form').getForm().reset();
											}
										}]
									}
								}).show();
							}
						}
					}
				},				
			]
			
			///renderTo: Ext.getBody()
		});
	//~ Ext.getCmp('profile_image').center();	
	return pnlProfileImage;
};

