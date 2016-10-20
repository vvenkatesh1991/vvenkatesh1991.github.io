// Created by Venkatesh. Handles the various routes in the application.
require(['jQuery', 'underscore', 'backbone'], function($, _, Backbone) {
	var AppRouter = Backbone.Router.extend({
		routes: {
			"home": "showHomeScreen"      
		},
		// Handler toshow home screen.
		showHomeScreen: function() {
			require(['view/homeView'], function(homeView) {
				new homeView();
			});
		}
	});
	// Initiate the router
	var appRouter = new AppRouter;

	// Start Backbone history a necessary step for bookmarkable URL's
	Backbone.history.start();
});