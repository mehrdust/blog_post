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

//***************** Chech session validity *****************************
	var seshen;
	var siteURL = window.location.protocol + "//" + window.location.host;
	var pathArray =  window.location.pathname.split( '/' );
	siteURL = siteURL + "/" + pathArray[1];
	ProfileImagePath = 'images/usersProfile/profile_images/';
	//~ NoProfileImage = 'no-profile-image.jpeg';
	NoProfileImage = 'unknown_user.gif';	


	Ext.Ajax.request({
		url: 'php/session_handle.php',
			//params: {queues:checkedIds.join('|'), agent: SelAgent},
		method: 'POST',
		success: function(response, request){
			//~ alert(response.responseText);
			obj = Ext.JSON.decode(response.responseText); 
			active_username = (obj.username)?obj.username:'0';
						
			active_user_id = obj.user_id;
			//~ alert(active_username+'|'+active_user_id);
			profile_image = obj.user_image;			
			if (active_username != '0' || active_user_id != '0') {
				//alert('Session has been expired.');
				//Ext.Msg.alert('Session valid','forwarding to the users page.');
				showResult('Session valid','Redirecting to the users page. Please wait ...');
				window.location.href='users_page.htm';
			}
		},
		failure: function() {
			Ext.Msg.alert('Connection not executed!');
		}
	});
//**********************************************************************

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
            //~ '<b><a  href="javascript:;" title="test hyperlink" id="lnk_Post" class="href_post_title" onclick="alert(\'{1}|{2}|{3}|{4}|{5}|{6}|{7}|{8}\')">{0}</a></b><br /><p class="href_post_category">Category: {1} </p>',
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
			r.data.profile_photo
		);
    }
//**********************************************************************
	//~ var MyProfile = getUsersProfile();
	//~ var MyProfileImage = getUsersProfileImage();
	//~ var MyPostsStore = getMyPosts();
	//~ var FindUsers = listAllUsers();


var Reader_Page = Ext.create('Ext.Viewport', {
        layout: {
            type: 'border',
            padding: 5
        },        
        defaults: {
            split: true
        },               
        items: [{
			region: 'north',
			height: 50,			
			split: false,		
			border: false,
		},{ //********************************* Center Region 
            region: 'center',            
            title: 'List of posts by all users',
            layout: 'fit',
            minHeight: 80,
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
	
	});
    
});
