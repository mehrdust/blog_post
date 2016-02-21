Ext.Loader.setConfig({enabled: true});

Ext.Loader.setPath('Ext.ux', 'ux');
Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.toolbar.Paging',
    'Ext.ux.PreviewPlugin',
    'Ext.ModelManager',
    'Ext.tip.QuickTipManager',
    'Ext.window.Window',
    'Ext.tab.*',
    'Ext.toolbar.Spacer',
    'Ext.layout.container.Card',
    'Ext.layout.container.Border',
    'Ext.form.*',
    'Ext.layout.container.Column',
    'Ext.tab.Panel',    
	'Ext.window.MessageBox',
    'Ext.tip.*',
    'Ext.Action',
    'Ext.Img',
    'Ext.ux.RowExpander'
]);

Ext.onReady(function() {
Ext.QuickTips.init();

//***************** Check session validity *****************************
	var siteURL = window.location.protocol + "//" + window.location.host;
	var pathArray =  window.location.pathname.split( '/' );
	siteURL = siteURL + "/" + pathArray[1];
	ProfileImagePath = 'images/usersProfile/profile_images/';
	NoProfileImage = 'unknown_user.gif';	
	
	Ext.Ajax.request({
		url: 'php/session_handle.php',		
		method: 'POST',
		success: function(response, request){		
			obj = Ext.JSON.decode(response.responseText); 
			active_username = obj.username;
			active_userid = obj.user_id;
			profile_image = obj.user_image;			
			
			if (active_username == '0' || active_userid == '0') {
				Ext.Msg.alert('Session Expired','Session has been expired.');
				window.location.href='index.htm';
			}
			else {				
				if (profile_image == '0' || profile_image == '') profile_image = NoProfileImage;
				Ext.get('session_uname').setHTML('Welcome '+active_username+'!');
				Ext.get('thumb_image').dom.src = ProfileImagePath + profile_image;
				Ext.getCmp('profile_image').setSrc(ProfileImagePath + profile_image);
				
			}
		},
		failure: function() {
			showResult('Connection not executed!');
		}
	});
		
//******************* Post grid store **********************************
var types = Ext.data.Types; // allow shorthand type access

var PostStore = new Ext.data.JsonStore({
	autoDistroy: true,
	//~ autoSync: true,
	id: 'post_store',
	//~ autoLoad: true,
	pageSize: 10,
	method: 'POST',
	proxy: {
        type: 'ajax',
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
	
    PostStore.load({
		params:{
			start:0,
			limit: 10
		}
	});
	
	/************************************************
	 * 				Grid Cell render
	 ************************************************/
	// This funtion renders the grid profile image
	function renderIcon(val) {
		if (val == '0' || val == '') return '<img id="grd_pro_img" class="grid_profile_image" src="' + ProfileImagePath + NoProfileImage + '">';
		else return '<img id="grd_pro_img" class="grid_profile_image" src="' + ProfileImagePath + val + '">';
	}	
	
	// This function renders the topic cell which includes the Title, category, post short format
    function renderTopic(value, p, record) {		
        return Ext.String.format(
            '<b><a  href="javascript:;" id="lnk_Post" class="href_post_title" onclick="show_post_window(\'{1}\',{2},\'{3}\',\'{4}\',\'{5}\',{6},\'{7}\',\'{8}\')">{0}</a></b><br /><p class="href_post_category">Category: {1} </p>',
            value,
            record.data.posts_category,            
            record.data.posts_id,
            record.data.posts_username,
            record.data.posts_description,
            Ext.htmlEncode(record.data.posts_body.replace(/\n/g, "<br/>")),
            record.data.posts_replycount,
            record.data.profile_photo,
            Ext.Date.dateFormat(record.data.posts_create_datetime, 'M j, Y, g:i a')
		);                
    }
    // This function renders the Last post column which includes date of the last post together with the post author
    function renderLast(value, p, r) {
        return Ext.String.format(
			'{0}<br/>by <a href="javascript:;" id="lnk_Post" class="href_post_title" onclick="show_user_window(\'{2}\',\'{3}\')">{1}</a><br/>', 
			Ext.Date.dateFormat(value, 'M j, Y, g:i a'), 
			r.get('posts_username'),
			r.get('posts_user_id'),
			r.data.profile_photo,
			r.data.profile_DOB,
			r.data.profile_email,
			r.data.profile_location,
			r.data.profile_biography,
			r.data.profile_contactNo,
			r.data.profile_webpage,
			r.data.user_firstname+' '+r.data.user_lastname
		);
    }
//**********************************************************************
	var MyProfile = getUsersProfile();
	var MyProfileImage = getUsersProfileImage();
	var MyPostsStore = getMyPosts();
	var FindUsers = listAllUsers();
	
	var viewport = Ext.create('Ext.Viewport', {
        layout: {
            type: 'border',
            padding: 5
        },
        maxheight: 800,
        width: 520,
        defaults: {
            split: true
        },               
        items: [{
            region: 'north',
            //collapsible: true,
            //title: 'North',
            split: true,
            height: 50,
            //~ sortable: false,
            //~ minHeight: 60,
            //html: 'north'
		},{  // this region is about the user's statistics
            region: 'west',
            autoScroll: true,
            collapsible: true,
            collapsed: true,
            listeners: {
				collapse: function(){
					//~ Ext.Msg.alert('Status', 'Panel Collapsed.');
				},
				expand: function(){
					//~ Ext.Msg.alert('Status', 'Panel resized.');	
					getMyProfileDetails();
				}
			},        
            id : 'user_dashboard',
            title: 'User Dashboard',
            split: true,
            width: '40%',
            minWidth: 100,
            minHeight: 140,
			layout: 'accordion',
			align: 'middle',			
			items:[{
				title: 'My Profile',
				icon: 'images/icons/folder_wrench.png',
				autoScroll: true,
				layout: {
					type: 'vbox',
					align : 'stretch',
					pack  : 'start',
				},
				items:[MyProfileImage, MyProfile]
			},{
				title: 'My Posts',
				icon: 'images/icons/article.gif',
				id: 'pnlMyPosts',
				autoScroll: true,
				items: [MyPostsStore],
				listeners: {
					expand: function(){											
						Ext.getCmp('grd_my_posts').getStore().load({params: {user_id: active_userid}});						
					}
				},
				
			},{
				title: 'List of other users',
				icon: 'images/icons/add24.gif',
				id: 'panel3',
				layout:'fit',
				autoScroll: true,
				items: [FindUsers],
				listeners: {
					expand: function(){									
						Ext.getCmp('grd_users').getStore().load({params: {user_id: active_userid}});						
					}
				},
			}]
			
            
        },{
            region: 'center',            
            title: 'List of posts by all users',
            layout: 'fit',
            minHeight: 80,
            dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				//~ ui: 'footer',
				defaults: {minWidth: 20},
				items: [{ 
					xtype: 'button', 
					autoSize:true,
					text: 'Update List',
					icon: 'images/icons/table_refresh.png',
					handler: function(){
						Ext.getCmp('grdPostsList').getStore().load();
					}
				}]
			}],
            items: [{
				xtype: 'grid',			
				id: 'grdPostsList',
				store: PostStore,
				disableSelection: true,
				loadMask: true,				
				viewConfig: {
					id: 'gv',
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
					dataIndex: 'profile_photo',
					width: 50,
					renderer: renderIcon,
				},{				
					id: 'topic',
					text: "Topic",
					dataIndex: 'posts_description',					
					flex: 1,
					renderer: renderTopic,
					sortable: false
				},{
					text: "Author",
					dataIndex: 'username',
					width: 100,
					hidden: true,
					sortable: true
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
					id: 'last',
					text: "Post Date / Author",
					dataIndex: 'posts_create_datetime',
					width: 150,
					renderer: renderLast,
					sortable: true
				},{
                menuDisabled: true,
                text: 'Action',                
                sortable: false,
                xtype: 'actioncolumn',                
                width: 50,
                items: [{
                    icon   : 'images/icons/delete.gif',  // Use a URL in the icon config
                    tooltip: 'Delete Post',
                    handler: function(grid, rowIndex, colIndex) {
                        var rec = PostStore.getAt(rowIndex);
                        if (active_userid == rec.get('posts_user_id')  && active_username == rec.get('posts_username')) {
							Ext.MessageBox.confirm('Confirm', 'Are you sure you want to delete this post?', function (btn){
							    if (btn == 'yes') {
									Ext.Ajax.request({            
										url: 'php/post_delete.php',
										params: {post_id: rec.get('posts_id')},
										method: 'POST', 
										success: function(response, request){
											showResult('Post Deleted','Your post is successfully removed.');
											PostStore.load();
										},
										failure: function() {
										showResult('Operation Suspended','Connection not executable');
										}
									});
							    }
							    
							});
						}
						else showResult('Operation Suspended',"You cannot delete other users' posts");
                    }                
                },{
                    icon   : 'images/icons/post.gif',  // Use a URL in the icon config
                    tooltip: 'Post Reply',
                    handler: function(grid, rowIndex, colIndex) {
                        var rec = PostStore.getAt(rowIndex);                        
                        
                        handle_post_reply(active_userid, rec.get('posts_id'));
                        
                        //~ PostStore.load();
                        
                    }                
                }]
            }],
				// paging bar on the bottom
				bbar: Ext.create('Ext.PagingToolbar', {
				store: PostStore,
				displayInfo: true,
				displayMsg: 'Displaying topics {0} - {1} of {2}',
				emptyMsg: "No topics to display",
				items:[{
					}]
			}),
			}],            
		}]
    });      
});



