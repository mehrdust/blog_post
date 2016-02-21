	
	// modal window for creating new users
    Ext.get('lnk_register').on("click", function(e, t) {
		
		var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

        Ext.create('Ext.Window', {
            title: 'Acount Registration Form',
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
				layout: 'form',       
				id: 'simpleForm',
				url: 'save-form.php',
				frame: true,
				bodyPadding: '5 5 0',
				width: 350,
				fieldDefaults: {
					msgTarget: 'side',
					labelWidth: 75
				},
				defaultType: 'textfield',
				listeners: {
					'validitychange': function(form, valid) {
						if (valid) Ext.getCmp('btnRegister').enable();
						else Ext.getCmp('btnRegister').disable();
					}
				},
				items: [{
					xtype:'fieldset',
					//checkboxToggle:true,
					title: 'Account Information',
					defaultType: 'textfield',
					collapsed: false,
					layout: 'anchor',
					defaults: {
						anchor: '100%'
					},
					items :[{
						fieldLabel: 'Nickname',
						afterLabelTextTpl: required,
						id: 'nickname',
						allowBlank:false,
						textValid: false,
						validator: function() {
							return this.textValid;
						},
						listeners: {
							'change': function(textfield, newValue, oldValue) {								
								if (newValue.length <=5) {
										this.markInvalid('User is already registered');
										this.textValid = 'Nickname must be at least 6 characters';
										return false;
								}
								Ext.Ajax.request({									
									url: 'php/ValidateUser.php',
									params: {nickname: newValue},
									scope: textfield,
									success: function(response){
										if (response.responseText == 'valid'){
											this.clearInvalid();
											this.textValid = true;
										} else {
											this.markInvalid(response.responseText);
											this.textValid = false;
										}
									}
								});
							}
						}
					},{
						fieldLabel: 'Password',
						afterLabelTextTpl: required,
						inputType: 'password',
						id: 'register_password',
						allowBlank:false
					},{
						fieldLabel: 'Confirm Password',
						afterLabelTextTpl: required,
						inputType: 'password',
						id: 'conf_password',
						allowBlank:false,
						//textValid: false,
						validator: function() {
							var pass1 = Ext.getCmp('register_password').getValue();
							var pass2 = Ext.getCmp('conf_password').getValue();
							//~ console.log("pass 1 = " + pass1 + "--pass 2 = " + pass2);

							if (pass1 == pass2)
							return true;

							else 
							return "Passwords do not match!";	
						}
						
					}],
				},{
					xtype:'fieldset',
					//checkboxToggle:true,
					title: 'Personal Details',
					defaultType: 'textfield',
					//collapsed: true,
					layout: 'anchor',
					defaults: {
						anchor: '100%'
					},
					items : [{
						fieldLabel: 'Email',
						afterLabelTextTpl: required,
						name: 'email',
						id: 'email',
						allowBlank:false,
						vtype:'email'
					},{
						fieldLabel: 'First Name',
						//afterLabelTextTpl: required,
						name: 'first',
						id: 'first',
						//allowBlank:false
					},{
						fieldLabel: 'Last Name',
						//afterLabelTextTpl: required,
						name: 'last',
						id: 'last'
					}],
				}],
			},
            buttons: [
				  { text: 'Register',
					id: 'btnRegister',
					icon   : 'images/icons/accept.png',
					disabled: true,
					handler: function(){						
						var nickname = Ext.getCmp('nickname').getValue();
						var first = Ext.getCmp('first').getValue();
						var last = Ext.getCmp('last').getValue();
						var email = Ext.getCmp('email').getValue();	
						var password = Ext.getCmp('register_password').getValue();	
						
						 Ext.Ajax.request({
							url: 'php/RegisterUser.php',
							params: {nickname:nickname, password: password, first: first, last:last, email:email},
							method: 'POST',
							success: function(response, request){
								  //alert(response.responseText);
								  showResult('User Registered', 'Congratulations! You are now registered to our system. Please Sign in now.');								  
								  Ext.getCmp('window_register').close();
								  
								  
							},
								  failure: function() {
									Ext.Msg.alert('Connection not executed!', 'Cannot submit the form');
							   }
						});
					}
				  },
				  { text: 'Reset Selection',
					icon   : 'images/icons/table_refresh.png',
					handler: function(){
						//qPenPopUp.hide();
						Ext.getCmp('nickname').reset();
						Ext.getCmp('first').reset();
						Ext.getCmp('last').reset();
						Ext.getCmp('register_password').reset();
						Ext.getCmp('conf_password').reset();
						Ext.getCmp('email').reset();
					}
				  }
			]
        }).show();
    });

/*****************************************
 * This will create a popup alert message
/*****************************************/

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
