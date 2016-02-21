//*******************************************************************************************
//This function is to populate the "My Profile" panel under User Dashboard
//*******************************************************************************************

function getUsersProfile() {	
	var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

	var frmProfileUpdate = Ext.create('Ext.panel.Panel', {
		title: 'My Profile Details',
		autoScroll: true,
		flex: 3,
		items: [{
			xtype: 'form',	
			frame: true,
			bodyPadding: '10 10 0',
			defaults: {
				anchor: '100%',
				allowBlank: false,
				msgTarget: 'side',
				labelWidth: 30,
			},
			defaultType: 'textfield',			
			items: [{
					xtype:'fieldset',					
					collapsible: true,
					title: 'Personal Details',
					defaultType: 'textfield',
					collapsed: false,
					layout: 'anchor',
					defaults: {
						anchor: '100%'
					},
					items :[{
						fieldLabel: 'First Name',
						disabled: true,
						id: 'first_name',
						},{
						fieldLabel: 'Last Name',						
						disabled: true,
						id: 'last_name'						
					},{						
						fieldLabel: 'Date of Birth',
						xtype: 'datefield',
						format: 'Y-m-d',
						id: 'dob'
					},{
						fieldLabel: 'Country',
						id: 'country',
					},{
						//~ xtype: 'htmleditor',
						xtype: 'textareafield',
						id: 'biograph',
						fieldLabel: 'Biography',
						height: 170,
						//~ anchor: '100%'
					}]
				},{
					xtype:'fieldset',
					//checkboxToggle:true,
					collapsible: true,
					title: 'Contact Details',
					defaultType: 'textfield',
					collapsed: false,
					layout: 'anchor',
					defaults: {
						anchor: '100%'
					},
					items :[{
						fieldLabel: 'Contact No',
						id: 'contact_no',
					},{
						fieldLabel: 'Email',
						vtype:'email',
						id: 'email_address',
					},{
						fieldLabel: 'Web Page',
						id: 'web_page',
					}]
				}],
				
			}],
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'bottom',
				//~ ui: 'footer',
				defaults: {minWidth: 20},
				items: [{ 
					xtype: 'button', 
					autoSize:true,
					text: 'Update Profile',
					icon: 'images/icons/accept.png',
					handler: function(){
						updateMyProfileData();
					}
				},{ 
					xtype: 'button', 
					text: 'Cancel Changes',
					icon: 'images/icons/cross.gif',
					handler: function(){
						//~ getMyProfileDetails();
						Ext.getCmp('user_dashboard').collapse();
					}
				}]
			}],
			viewConfig: {
            stripeRows: true,
            listeners: {
                itemcontextmenu: function(view, rec, node, index, e) {
                    e.stopEvent();
                    contextMenu.showAt(e.getXY());
                    return false;
                }
            }
        },			
	});
	
  return  frmProfileUpdate;
};
