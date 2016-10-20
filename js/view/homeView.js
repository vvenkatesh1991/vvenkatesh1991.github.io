define(['jQuery', 'underscore', 'backbone', 'handlebars', 'text!' + contextRoot + 'templates/homeView.tpl'], function($, _, Backbone, Handlebars, template) {
	var homeView = Backbone.View.extend({
		// Target view dom element
		el: '#module-section',
		
		// Unbind events before binding to avoid multiple invocation.
		initialize: function() {
			$(this.el).off();
			this.render();
		},
		
		// Renders the home screen.
		render: function() {
			
		}
	});
	
	return homeView;
});