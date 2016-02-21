function handle_post_reply(user_id, post_id) {
		
	var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

	//******************** Window for new post *********************
	var window_reply_post = Ext.create('Ext.Window', {
		title: 'Post Reply Form',
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
			id: 'PostReplyForm',
			//~ url: 'save-form.php',
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
					var PostReplyTopic = Ext.getCmp('post_topic').getValue();
					var PostReplyBody = Ext.htmlEncode(Ext.getCmp('post_body').getValue());						
					
					Ext.Ajax.request({
						url: 'php/submit_post_reply.php',
						params: {post_topic:PostReplyTopic, post_body: PostReplyBody, post_user_id: user_id, post_id: post_id},
						method: 'POST',
						success: function(response, request){
						//alert(response.responseText);
							Ext.getCmp('grdPostsList').getStore().load();
							
							post_details = Ext.getCmp('grd_post_details');
							if (post_details) post_details.getStore().load({params:{postId:post_id}});
							else alert('cannot find');
							
							window_reply_post.close();
							
						},
						failure: function() {
							Ext.Msg.alert('Connection not executed!', 'Cannot submit the form');
					   }
					});
				}
			  }],
			}
	}).show();	
}
