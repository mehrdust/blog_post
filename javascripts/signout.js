Ext.onReady(function() {
	var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
	
	// modal window for creating new users
    Ext.get('lnk_logout').on("click", function(e, t) {

		Ext.MessageBox.confirm('Confirm', 'Are you sure you want to log out now?', function (btn){
			if (btn == 'yes') {
				Ext.Ajax.request({            
					url: 'php/logout.php',
					method: 'POST',
					success: function(response, request){
					Ext.Msg.alert('Log out','You are successfully logged out now');
						window.location.href='index.htm';
					
					//alert(response.responseText);
					},
					failure: function() {
						Ext.Msg.alert('Connection not executable');
					}
				});
			}
		});
	});							
});							
