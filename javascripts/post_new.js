var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

// modal window for creating new users
Ext.get('lnk_new_post').on("click", function(e, t) {
	
	// Define the model for a State
	Ext.regModel('Category', {
		fields: [
			{type: 'string', name: 'cat_id'},
			{type: 'string', name: 'cat_name'},
			{type: 'string', name: 'cat_detail'}
		]
	});

	// The data store holding the states	
	var category_store = new Ext.data.JsonStore({	
		autoDistroy: true,
		id: 'category_store',
		proxy: {
			type: 'ajax',        
			url: 'php/get_category_list.php',  // url that will load data with respect to start and limit params
			reader: {type: 'json'}
		},	
		fields: [
			'cat_id', 'cat_name', 'cat_detail'
		]
	});
	category_store.load(); 
	
	//******************** Window for new post *********************
	
	var window_new_post = Ext.create('Ext.Window', {
		title: 'New Post Entry Form',
		//~ height: 300,
			autosize: true,
			draggable: true,
			autoscroll:true,
			width: 500,
			modal: true,
			headerPosition: 'top',
			layout: 'fit',
		items: {		
			xtype: 'form',
			layout: 'form',       
			id: 'simpleForm',
			url: 'save-form.php',
			frame: true,
			bodyPadding: '5 5 0',
			width: 350,
			fieldDefaults: {
				msgTarget: 'side',
				labelWidth: 100
			},
			defaultType: 'textfield',
			listeners: {
				'validitychange': function(form, valid) {
					if (valid) Ext.getCmp('btnSubmit').enable();
					else Ext.getCmp('btnSubmit').disable();
				}
			},
			items: [{
					fieldLabel: 'Post Topic',
					afterLabelTextTpl: required,
					id: 'post_topic',
					allowBlank:false,											
				},{
					xtype: 'combo',
					fieldLabel: 'Post Category',
					afterLabelTextTpl: required,
					editable: false,
					id: 'post_category',
					displayField: 'cat_name',
					valueField: 'cat_id',
					store: category_store,
					queryMode: 'local',
					typeAhead: true,
					value: 'No Category',
					allowBlank:false
				},{
					xtype: 'textareafield',
					fieldLabel: 'Post Body',
					enforceMaxLength: true,
					maxLength: 140,					
					maxLengthText: "Post body cannot take more than 140 characters",
					afterLabelTextTpl: required,
					id: 'post_body',
					allowBlank:false,
					//textValid: false,
	
				}],
			buttons: [
			  { text: 'Submit',
				id: 'btnSubmit',
				icon   : 'images/icons/accept.png',
				disabled: true,
				handler: function(){												
					var PostTopic = Ext.getCmp('post_topic').getValue();
					var PostCategory = '';
					//alert(Ext.getCmp('post_category').getSubmitValue());
					if (Ext.getCmp('post_category').getSubmitValue() == 'No Category') PostCategory = 1;
					else PostCategory = Ext.getCmp('post_category').getValue();
					var PostBody = Ext.htmlEncode(Ext.getCmp('post_body').getValue());						
					
					
					Ext.Ajax.request({
						url: 'php/submit_post.php',
						params: {post_topic:PostTopic, post_category: PostCategory, post_body: PostBody},
						method: 'POST',
						success: function(response, request){
						//alert(response.responseText);
							Ext.getCmp('grdPostsList').getStore().load();
							window_new_post.close();
						},
						failure: function() {
							Ext.Msg.alert('Connection not executed!', 'Cannot submit the form');
					   }
					});
				}
			  }],
			}
	}).show();
});
