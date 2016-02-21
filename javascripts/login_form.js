Ext.require([
    'Ext.window.Window',
    'Ext.tab.*',
    'Ext.toolbar.Spacer',
    'Ext.layout.container.Card',
    'Ext.layout.container.Border',
    'Ext.form.*',
    'Ext.layout.container.Column',    
    'Ext.window.MessageBox',
    'Ext.tip.*',
    'Ext.tab.Panel'
]);

Ext.onReady(function(){
		
	var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
	var loggedin = false;
	var LoginForm = Ext.widget({
        xtype: 'form',
        //~ layout: 'form',
        //~ renderTo:'signin_menu',
        //collapsible: true,
        id: 'loginForm',
        url: 'php/login.php',
        frame: true,
        title: 'Login Form',
        //~ bodyPadding: '0 0 0 0',
        width: 250,
        fieldDefaults: {
            msgTarget: 'side',
            labelWidth: 75
        },
        listeners: {
			'validitychange': function(form, valid) {
				if (valid) Ext.getCmp('btnLogin').enable();
				else Ext.getCmp('btnLogin').disable();
			}
		},
        defaultType: 'textfield',
        items: [{
            fieldLabel: 'Username',
            afterLabelTextTpl: required,
			hasfocus:true,
            id: 'userName',
            allowBlank:false
        },{
            fieldLabel: 'Password',
            afterLabelTextTpl: required,
            inputType: 'password',
            id: 'passWord',
            allowBlank:false
        }],

        buttons: [{
            text: 'Login',
            id: 'btnLogin',
			icon   : 'images/icons/accept.png',
			disabled: true,
			handler: function(){						
				var usrname = Ext.getCmp('userName').getValue();
				var pwd = Ext.getCmp('passWord').getValue();
				
				Ext.Ajax.request({
					url: 'php/login.php',
					params: {username: usrname, password: pwd},
					method: 'POST',
					success: function(response, request){		
						var obj = JSON.parse(response.responseText);
						if (obj.success) {
							Ext.Msg.alert('Login Successful!', 'Welcome. You are now logged in');
							
							Ext.get('signin_menu').hide();		
							Ext.get('lnk_signin').removeCls("menu-open");
							
							var redirect = 'users_page.htm'; 
							window.location = redirect;
							
						}
						else {
							Ext.Msg.alert('Login Failed!', obj.reason);
							Ext.getCmp('userName').focus(false, 200);
						}
					},
						  failure: function() {
							Ext.Msg.alert('Connection not executed!', 'Cannot submit the form');
					   }
				});
			}
        }]
    });
    
	
	
	// login form toggle
	Ext.get('lnk_signin').on("click", function(e, t) {
		Ext.get('signin_menu').toggle();		
		//~ LoginForm.expand();
		Ext.get('lnk_signin').toggleCls("menu-open");
		//~ if (Ext.get('lnk_signin').hasCls('menu-open')) alert("open");
		//~ else alert("not open");
		if (!loggedin) {
			LoginForm.render('signin_menu');		
			loggedin = true;
		}
		//~ else loggedin = false;
	});

});
