jQuery(function authenticate ($) {

	var ref = new Firebase("https://cafeteria-abc.firebaseio.com");

	function authDataCallback(authData) {
		var tmp0;
		var tmp1;
		var html0;
		var html1;

		if ( authData ) {
			//render user greeting info and basket
			tmp0 = Templates['make-order'];
		  	tmp1 = Templates.basket;
		  	var p = authData.google.cachedUserProfile;
		  	var data = {
		  		firstName: p.given_name,
		  		picture: p.picture,
		  		fullName: p.name
		  	};
		  	html0 = tmp0(data);
		  	html1 = tmp1(data);

		} else {
			// render login button and empty basket
			tmp0 = Templates.login;
			html0 = tmp0();

			html1 = '';

		}
	    $('#order').html(html0);
	    $('#basket').html(html1);

		$("#signin").one('click', function() {

			ref.authWithOAuthRedirect("google", function(error) {
			  if (error) {
			    console.log("Login Failed!", error);
			  } else {
			    // We'll never get here, as the page will redirect on success.
			  }
			});
		});
		
		$('#logoff').one('click', function() {
			ref.unauth();
		});
	}

	ref.onAuth(authDataCallback);
});
