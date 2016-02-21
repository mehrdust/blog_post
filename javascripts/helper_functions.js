/*******************************
 * Handler function for the 
 * 'cancel changes' button
 * *****************************/
function updateMyProfileData() {
	
	arr = Ext.getCmp('profile_image').src.split('/');
	image_path = arr[arr.length-1];
	//~ alert(image_path);
	image_path = (image_path == 'unknown_user.gif')?'':image_path;
	//~ image_path = Ext.getCmp('profile_image').src;
	
	first_name = Ext.getCmp('first_name').getValue(); 
	last_name = Ext.getCmp('last_name').getValue();	
	country = Ext.getCmp('country').getValue();
	dob = Ext.getCmp('dob').getRawValue();	
	//~ dob = dob.replace('/', '-');
	//~ dob = '26/07/1982';
	contact_no = Ext.getCmp('contact_no').getValue();
	email_address = Ext.getCmp('email_address').getValue();
	web_page = Ext.getCmp('web_page').getValue();
	bio = Ext.getCmp('biograph').getValue();			
	
	Ext.Ajax.request({
		url: 'php/update_profile_data.php',
		params: {
			image_path: image_path, 
			first_name: first_name, 
			last_name: last_name, 
			country: country, 
			dob: dob, 
			contact_no: contact_no, 
			email_address: email_address, 
			web_page: web_page,
			biography: bio
		},
		method: 'POST',
		success: function(response, request){
			resp = Ext.JSON.decode(response.responseText);
			if (resp.success == true) {
				showResult('Success','Profile updated successfully');
				//todo
				Ext.getCmp('grdPostsList').getStore().load();
			}
			else showResult(response.responseText);
			//else alert('failed');
			//~ alert(response.responseText);			
		},
		  failure: function() {
			showResult('Connection not executed!');
		}
	});		
	Ext.getCmp('user_dashboard').collapse();
}

/*******************************
 * Handler function for the 
 * 'cancel changes' button
 * *****************************/
function getMyProfileDetails() {
	var site_URL = window.location.protocol + "//" + window.location.host;
	var pathArray =  window.location.pathname.split( '/' );
	site_url = site_URL + "/" + pathArray[1];
	
	Ext.Ajax.request({
		url: 'php/load_profile_details.php',
		//~ params: {user_id},
		method: 'POST',
		success: function(response, request){
			//~ alert(response.responseText);
			json_response = Ext.JSON.decode(response.responseText);
			NoProfileImage = 'unknown_user.gif';
			if (json_response.profile_photo == '0' || json_response.profile_photo == '') 
				prof_img = NoProfileImage;
			else prof_img = json_response.profile_photo;
			
			Ext.getCmp('first_name').setValue(json_response.user_firstname); 
			Ext.getCmp('last_name').setValue(json_response.user_lastname); 
			Ext.getCmp('country').setValue(json_response.profile_location); 
			Ext.getCmp('dob').setValue(json_response.profile_DOB); 
			Ext.getCmp('contact_no').setValue(json_response.profile_contactNo); 
			Ext.getCmp('email_address').setValue(json_response.profile_email); 
			Ext.getCmp('web_page').setValue(json_response.profile_webpage); 
			Ext.getCmp('profile_image').setSrc(ProfileImagePath + prof_img);
			Ext.getCmp('biograph').setValue(json_response.profile_biography);
			Ext.get('thumb_image').dom.src = ProfileImagePath + prof_img;
			
			//~ Ext.getCmp('biography').setValue(json_response.profile_biography); 
			//alert(json_response.user_nickname);							
		},
			  failure: function() {
				showResult('Connection not executed!');
		   }
	});
	
}
//*****************************************
// this is to load the list of countries 
// from the xml file into the store
//*****************************************

var store = new Ext.data.XmlStore({
    // store configs
    autoDestroy: true,
    storeId: 'country_list',
    url: 'countries.xml', // automatically configures a HttpProxy
    // reader configs
    record: 'Item', // records will have an "Item" tag
    idPath: 'ASIN',
    totalRecords: '@TotalResults',
    fields: [
        // set up the fields mapping into the xml doc
        // The first needs mapping, the others are very basic
        'country_id', 'country_name'
    ]
});

/*****************************************
 * */
var delect_post = Ext.create('Ext.Action', {
	icon   : 'images/delete.gif',  // Use a URL in the icon config
	text: 'Delete this post',
	disabled: true,
	handler: function(widget, event) {
		var rec = grdPostsList.getSelectionModel().getSelection()[0];
		if (rec) {
			//~ alert('test1');
			//~ Ext.example.msg('Sell', 'Sell ' + rec.get('company'));
		}
	}        
});


var post_reply = Ext.create('Ext.Action', {
	iconCls: 'reply-button',
	text: 'Post Reply',
	disabled: true,
	handler: function(widget, event) {
		var rec = grid.getSelectionModel().getSelection()[0];
		if (rec) {
			//~ Ext.example.msg('Buy', 'Buy ' + rec.get('company'));
			//~ alert('test2');
		}
	}
});

var contextMenu = Ext.create('Ext.menu.Menu', {
	items: [
		delect_post,
		post_reply
	]
}); 
 
/*****************************************
* This is to handle the onclick event on 
* the posts topic in the "List of posts by 
* all users" Grid 
//****************************************/
function show_post_window(posts_category, posts_id, posts_username, posts_description, posts_body, posts_replycount, profile_photo,  posts_create_datetime) {

	
//**********************************************************************
	var post_view_list = new Ext.data.JsonStore({
		autoDistroy: true,
		Id: 'postViewList',	
		autoDistroy: true,
		//~ autoSync: true,
		//~ autoLoad: true,
		proxy: {
			type: 'ajax',      
			method: 'POST',  
			url: 'php/get_post_views.php',  // url that will load data with respect to start and limit params
		},
		reader: {
				type: 'json',
				root: 'items',
				totalProperty: 'total'
		},
		fields: [
			{name: 'view_date_time', type: 'string'},
			{name: 'user_nickname', type: 'string'},
			{name: 'user_id', type: 'string'},
			{name: 'user_firstname', type: 'string'},
			{name: 'user_lastname', type: 'string'},
			//~ {name: 'replier_profile_photo', type: 'string'}
		]
	});
    

	var post_details = new Ext.data.JsonStore({
		autoDistroy: true,
		Id: 'PostDetails',	
		autoDistroy: true,
		//~ autoSync: true,
		//~ autoLoad: true,
		proxy: {
			type: 'ajax',      
			method: 'POST',  
			url: 'php/getPostDetails.php',  // url that will load data with respect to start and limit params
		},
		reader: {
				type: 'json',
				root: 'items',
				totalProperty: 'total'
		},
		fields: [
			{name: 'reply_title', type: 'string'},
			{name: 'reply_body', type: 'string'},
			{name: 'reply_date_time', type: 'string'},
			{name: 'user_nickname', type: 'string'},
			{name: 'user_firstname', type: 'string'},
			{name: 'user_lastname', type: 'string'},
			{name: 'replier_profile_photo', type: 'string'}
		]
	});
    
    post_details.load({
		params:{
			postId:posts_id
		}
	});

	set_post_view(posts_id);
	if (profile_photo == '0' || profile_photo == '') profile_photo = NoProfileImage;
		
	Ext.create('Ext.Window', {
		title: 'Post details',
		height: 500,
		width: 830,
		//~ autosize: true,
		draggable: true,
		autoscroll:true,
		id: 'window_register',
		modal: true,
		headerPosition: 'top',		
		layout:'border',		
		defaults: {
			collapsible: true,
			split: true,
			bodyStyle: 'padding:1px'
		},
		items: [{
			xtype: 'panel',
			region: 'west',
			title: 'Main post',		
			width: 320,
			collapsible: true,	
			resizeable: true,
			id: 'main_post',
			html: 	"<table>"+
						"<tr>" +
							"<td> <img class='main_post_image' src='images/usersProfile/profile_images/"+profile_photo+"'></td>" +
							"<td class='main_post_header'>" +
								"<span class='main_post_title'> Author: </span> " + posts_username + "<br />" +
								"<span class='main_post_title'> Post Date: </span> " + posts_create_datetime + "<br />" +
								"<span class='main_post_title'> Post Title: </span> " + posts_description + "<br />" +
								"<span class='main_post_title'> Total Replies: </span> " + posts_replycount + "<br />" +
								"<span class='main_post_title'> Total Views: </span> " + posts_replycount + 
							" </td>" +
						"</tr>" +
						"<tr> <td> <hr class='main_post_line' /></td>  <td> <hr class='main_post_line' /></td>   </tr>" +
						"<tr>" +
							"<td class='main_post_body_header'> <br /> <span class='main_post_title'> Post Body: </span> </td>" + 
						"</tr>" +
						"<tr>" +
							"<td class='main_post_body'> <br />" + posts_body.replace("<br/>","\n") + " </td>" +
						"</tr>" +
					"</table><br /><br />"
			
		},{
			region: 'center',            
			title: 'List of replies by all users',			
			layout: 'fit',
			collapsible: false,			
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				//~ ui: 'footer',
				defaults: {minWidth: 20},
				items: [{ 
					xtype: 'button', 
					autoSize:true,
					text: 'Post Reply',
					icon: 'images/icons/accept.png',
					handler: function(){
						if (active_userid == '0') 
							showResult('Action Not Allowed', 'You must register as a user \n to be able to reply to posts');
						else handle_post_reply(active_userid, posts_id);												 
					}
				},{ 
					xtype: 'button',
					autoSize:true,
					text: 'Refresh',
					icon: 'images/icons/table_refresh.png',
					handler: function(){
						post_details.load({
							params:{
								postId:posts_id
							}
						});
					}
				}]
			}],
			items: {
				xtype: 'grid',
				id: 'grd_post_details',
				store: post_details,									
				// grid columns
				columns:[{text: 'User ID', dataIndex: 'user_nickname', width: 70},
						 {text: 'First Name', dataIndex: 'user_firstname', width: 100},
						 {text: 'Last Name', dataIndex: 'user_lastname', width: 120},
						 {text: 'Reply Date/Time', dataIndex: 'reply_date_time', width: 130}
				 ],				
				 plugins: [{
					ptype: 'rowexpander',
					rowBodyTpl : [
						"<img class='main_post_image' src='images/usersProfile/profile_images/{replier_profile_photo}'>",
						'<p><b>Reply Title:</b> {reply_title}</p><br>',
						'<p><b>Reply Body:</b> {reply_body}</p>'
					]
				}],
			}
			
		},{
			region: 'east',            
			collapsible: true,
			collapsed: true,
			title: 'List of all views on this post',
			layout: 'fit',
			flex: 1,
			listeners: {
				expand: function(){
					post_view_list.load({
						params:{
							postId:posts_id
						}
					});

				}
			},
			items: {
				xtype: 'grid',
				id: 'grd_view_list',
				store: post_view_list,									
				// grid columns
				columns:[{text: 'User ID', dataIndex: 'user_nickname', width: 70},
						 //~ {text: 'First Name', dataIndex: 'user_firstname', width: 100},
						 //~ {text: 'Last Name', dataIndex: 'user_lastname', width: 120},
						 {text: 'Last View', dataIndex: 'view_date_time', width: 130}
				 ],								 
			}
		}],						
	}).show();
}


//******************************************************************************************************
// this function Inserts a new view each time a user opens a post to view it's details
//******************************************************************************************************
function set_post_view(posts_id, user_id) {
	
	if (typeof active_userid  === "undefined") {
		//~ alert('no active'); 
		active_userid = '0'; 
	}		
}
//******************************************************************************************************
// This function will query the list of posts owned by this user
//******************************************************************************************************
function getMyPosts() {
	var post_view_list = new Ext.data.JsonStore({
		autoDistroy: true,
		Id: 'myPostsList',	
		autoDistroy: true,
		//~ autoSync: true,
		//~ autoLoad: true,
		proxy: {
			type: 'ajax',      
			method: 'POST',  		
			url: 'php/getMyPosts.php',  // url that will load data with respect to start and limit params
		},
		reader: {
				type: 'json',
				root: 'items',
				totalProperty: 'total'
		},		
		fields: [
			'posts_id', 'posts_user_id', 'post_category_name', 'user_nickname', 'user_firstname', 'user_lastname',
			{name: 'posts_description', type: 'string'},
			{name: 'user_nickname', type: 'string'},
			{name: 'posts_body', type: 'string'},
			{name: 'posts_create_datetime', type: 'string', align: 'center'}
		]
	});
	
	
	var grdMyPosts = new Ext.grid.GridPanel({
		id: 'grd_my_posts',
		autoScroll: true,
		store: post_view_list,														
		dockedItems: [{
			xtype: 'toolbar',
			dock: 'bottom',
			align: 'center',
			//~ ui: 'footer',
			defaults: {minWidth: 20},
			items: [{ 
				xtype: 'button', 
				autoSize:true,
				text: 'Update List',
				icon: 'images/icons/table_refresh.png',
				handler: function(){
					post_view_list.load({params: {user_id: active_userid}});
				}
			}]
		}],
		columns:[{text: 'Post Title', dataIndex: 'posts_description', width: 200},
				 {text: 'Category', dataIndex: 'post_category_name', width: 100, align: 'center'},
				 {text: 'Created Date', dataIndex: 'posts_create_datetime', width: 150},
				 {
					menuDisabled: true,
					text: 'Action',
					sortable: false,
					xtype: 'actioncolumn',                
					align: 'center',
					width: 50,
					items: [{
						icon   : 'images/icons/delete.gif',  // Use a URL in the icon config
						tooltip: 'Delete Post',
						//~ disabled: true,
						handler: function(grid, rowIndex, colIndex) {
							var rec = post_view_list.getAt(rowIndex);
							//alert("Sell " + rec.get('company'));
							//~ alert (active_userid+ ' > ' + rec.get('posts_user_id')  + ' | '  + active_username + ' > ' + rec.get('posts_username'));							
							Ext.MessageBox.confirm('Confirm', 'Are you sure you want to delete this post?', function (btn){
								if (btn == 'yes') {
									Ext.Ajax.request({            
										url: 'php/post_delete.php',
										params: {post_id: rec.get('posts_id')},
										method: 'POST', 
										success: function(response, request){
											//~ Ext.Msg.alert('Post Deleted','Your post is successfully removed.');
											showResult('Post Deleted','Your post is successfully removed.');
											Ext.getCmp('grdPostsList').getStore().load();
											post_view_list.load({params: {user_id: active_userid}});						
										},
										failure: function() {
										//~ Ext.Msg.alert('Operation Suspended','Connection not executable');
										showResult('Operation Suspended','Connection not executable');
										}
									});
								}
								
							});
						}
					}]
				}
		 ]
	 });
					 
	
	return grdMyPosts;
}

//******************************************************************************************************
// This function queries all active users and loads them into a data store
//******************************************************************************************************
function listAllUsers() {

	var users_list = new Ext.data.JsonStore({
		autoDistroy: true,
		Id: 'Users_List',	
		autoDistroy: true,
		//~ autoSync: true,
		//~ autoLoad: true,
		proxy: {
			type: 'ajax',      
			method: 'POST',  		
			url: 'php/getUsersList.php',  // url that will load data with respect to start and limit params
		},
		reader: {
				type: 'json',
				root: 'items',
				totalProperty: 'total'
		},		
		fields: [
			'user_id', 'user_nickname', 'user_firstname', 'user_lastname', 'profile_email', 'profile_location', 
					'profile_biography', 'profile_photo', 'profile_contactNo', 'profile_webpage', 'profile_DOB', 
					'total_posts', 'total_replies', 'total_views', 'last_view', 'last_reply'			
		]
	});
	
	// This funtion renders the grid profile image
	function renderImage(val) {
		if (val == '0' || val == '') return '<img id="grd_pro_img" class="grid_profile_image" src="' + ProfileImagePath + NoProfileImage + '">';
		else return '<img id="grd_pro_img" class="grid_profile_image" src="' + ProfileImagePath + val + '">';
	}	
	
	var grdMyPosts = new Ext.grid.GridPanel({
		id: 'grd_users',
		border: false,
		autoScroll: true,
		store: users_list,															
		columns:[{dataIndex: 'profile_photo', width: 50, renderer: renderImage,
				},
				 {text: 'User Id', dataIndex: 'user_nickname', width: 60},
				 {text: 'Total Posts', dataIndex: 'total_posts', width: 80, align: 'center'},
				 {text: 'Total Replies', dataIndex: 'total_replies', width: 80, align: 'center'},
				 {text: 'Total Views', dataIndex: 'total_views', width: 80, align: 'center'},
				 {text: 'Last Post', dataIndex: 'last_reply', width: 130, align: 'center'},
				 {text: 'Last View', dataIndex: 'last_view', width: 130, align: 'center'},
		 ],				
		 plugins: [{
			ptype: 'rowexpander',
			rowBodyTpl : [			  				
				'<p><b>User Name:</b> {user_firstname}  {user_lastname}</p><br>',
				'<p><b>Date of Birth:</b> {profile_DOB}</p><br>',
				'<p><b>Contact Number:</b> {profile_contactNo}</p>',
				'<p><b>Web Page:</b> {profile_webpage}</p>',
				'<p><b>Email:</b> {profile_email}</p>',
				'<p><b>Location:</b> {profile_location}</p>',
				'<p><b>Biography:</b> {profile_biography}</p>',
			]
		}]
	 });
	 
	 return grdMyPosts;
}

//**********************************************************************
function show_user_window(user_id, user_avatar) {	
	
	var usr_profile_html = getProfileDetails(user_id);
	console.log(usr_profile_html);
	Ext.define('usr_details', {		
		user_name : undefined, 
		DOB: undefined, 
		prof_contactNo: undefined, 
		prof_webpage: undefined, 
		prof_email: undefined, 
		prof_location: undefined, 
		prof_biography: undefined
	});
		
	function renderDate(value, p, r) {
        return Ext.String.format(
		'{0}', Ext.Date.dateFormat(value, 'M j, Y, g:i a'));
	}
		
	var user_post_store = new Ext.data.JsonStore({
	autoDistroy: true,
	//~ autoSync: true,
	id: 'post_user_store',
	//~ autoLoad: true,
	pageSize: 10,
	method: 'POST',
	proxy: {
        type: 'ajax',
        params:{start:0, user_id: user_id, limit: 10},
        url: 'php/list_posts.php',  // url that will load data with respect to start and limit params
		//~ method: 'POST',
        reader: {
            type: 'json',
            root: 'topics',
            totalProperty: 'total'
    	    }
	},
	//~ pageSize: 10,	
	fields: [		
		{name: 'posts_id', type: 'int'},
		{name: 'posts_user_id', type: 'int'},
		{name: 'posts_replycount' , type: 'int'},
		{name: 'posts_viewcount' , type: 'int'},
		{name: 'posts_username', type: 'string'},
		{name: 'posts_description', type: 'string'},
		{name: 'posts_category', type: 'string'},		
		{name: 'posts_body', type: 'string'},
		{name: 'posts_category_id', type: 'int'},
		{name: 'profile_photo', type: 'string'},
		{name: 'posts_create_datetime', mapping: 'posts_create_datetime', type: 'date', dateFormat: 'timestamp'}
		//~ {name: 'posts_create_datetime', type: 'date', dateFormat: 'Y-m-d'}		
	]});
	
			
	Ext.create('Ext.Window', {
			title: 'User Profile',
			height: 400,
			width: 550,
			//~ autosize: true,
			draggable: true,
			autoscroll:true,
			id: 'window_user_profile',
			modal: true,
			headerPosition: 'top',
			listeners: {
				show: function(){										
					user_post_store.load({
						params:{
							start:0,
							user_id: user_id,
							limit: 10
						}
					});
				}
			},
			layout:'fit',								
			items: [{
				title: 'List of all posts by this user',				
				id: 'usr_posts_list',
				border: false,
				layout: 'fit',
				icon: 'images/icons/preview-bottom.gif',
				items:[{
					xtype: 'grid',
					minHeight: 310,
					id: 'grdUsrPostsList',				
					store: user_post_store,					
					disableSelection: true,
					loadMask: true,				
					border: false,
					viewConfig: {
						id: 'gvuserListposts',						
						trackOver: true,
						stripeRows: true,
						plugins: [{
							ptype: 'preview',
							bodyField: 'posts_body',
							expanded: true,
							pluginId: 'preview'
						}]
					},
					// grid columns
					columns:[{				
						id: 'usr_topicid',
						text: "Topic",
						dataIndex: 'posts_description',					
						width: 200,
						//~ renderer: renderTopic,
						sortable: false
					},{
						text: "Views",
						dataIndex: 'posts_viewcount',
						width: 70,
						align: 'right',
						sortable: true
					},{
						text: "Replies",
						dataIndex: 'posts_replycount',
						width: 70,
						align: 'right',
						sortable: true
					},{
						id: 'usr_last',
						text: "Post Date",
						dataIndex: 'posts_create_datetime',
						width: 150,
						renderer: renderDate,
						sortable: true
					}],
					plugins: [{
						ptype: 'rowexpander',
						rowBodyTpl : [			  				
							'<p><b>Post Body:</b> <br />{posts_body}</p><br>',							
						]
					}],				
					// paging bar at the bottom
					bbar: Ext.create('Ext.PagingToolbar', {
						store: user_post_store,
						displayInfo: true,
						displayMsg: 'Displaying topics {0} - {1} of {2}',
						emptyMsg: "No topics to display",					
					}),
				}]
			}]
		}).show();
			
}

function getProfileDetails(user_id) {
	
	var load_profile_details = Ext.Ajax.request({
		url: 'php/load_profile_details.php',
		params: {user_id: user_id},
		method: 'POST',		
		success: function(response, request){
			var usr_det = Ext.JSON.decode(response.responseText);
			if (usr_det.profile_photo == '' || usr_det.profile_photo == 'undefined' || usr_det.profile_photo == '0') usr_det.profile_photo = 'unknown_user.gif';
			var profile_html = "<td> <img class='main_post_image' src='images/usersProfile/profile_images/"+usr_det.profile_photo+"'></td>"+
				//~ '<p><b>User Name:</b>'+ user_name + '</p><br>'+
				'<p><b>Date of Birth:</b>'+usr_det.DOB+'</p><br>';
				//~ '<p><b>Contact Number:</b>'+prof_contactNo+'</p>'+
				//~ '<p><b>Web Page:</b>'+prof_webpage +'</p>'+
				//~ '<p><b>Email:</b>'+prof_email+' </p>'+
				//~ '<p><b>Location:</b>'+prof_location+'</p>'+
				//~ '<p><b>Biography:</b>'+prof_biography+'</p>'			
				
			console.log(profile_html);
			return profile_html;
		}		
	});	
}		
//******************************************************************************************************

// This is to create a popup alert message
//******************************************************************************************************
Ext.PopUp = function(){
	var msgCt;

	function createBox(t, s){
	   return '<div class="msg"><h3>' + t + '</h3><p>' + s + '</p></div>';
	}
	return {
		msg : function(title, format){
			if(!msgCt){
				msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
			}
			var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
			var m = Ext.DomHelper.append(msgCt, createBox(title, s), true);
			m.hide();
			m.slideIn('t').ghost("t", { delay: 5000, remove: true});
		},

		init : function(){
		}
	};
}();

function showResult(msgTitle,msgBody){
	Ext.PopUp.msg(msgTitle, msgBody);
};
