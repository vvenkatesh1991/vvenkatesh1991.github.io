define(['jQuery', 'underscore', 'backbone', 'handlebars', 'text!' + contextRoot + 'templates/homeView.tpl', 'collection/bookmarkCollection', 'model/staticModel'], function($, _, Backbone, Handlebars, template, bookmarks, labels) {
	var homeView = Backbone.View.extend({
		// Target view dom element
		el: '#module-section',
		
		events: {
			'click .tiles' : 'onTileClicked'
		},
		
		// Unbind events before binding to avoid multiple invocation.
		initialize: function() {			
			this.template = Handlebars.compile(template);
			this.labels = new labels();
			this.render();
		},
		
		// Renders the home screen.
		render: function() {
			var data = [
			{title: 'Google', url: 'www.google.com',folder: ''},
			{title: 'LindedIn', url: 'www.linkedin.com',folder: 'Favourites'},
			{title: 'Google', url: 'www.google.com',folder: 'Recent'},
			{title: 'yahoo', url: 'www.yahoo.com',folder: ''},
			{title: 'facebook', url: 'www.facebook.com',folder: ''},
			{title: 'linkedin', url: 'www.linkedin.com',folder: ''},
			{title: 'Citibank', url: 'www.citibank.co.in',folder: ''},			
			];
			
			data = _.groupBy(data,'folder');
			this.rootLevelBookmarks = data[""];
			delete(data[""]);
			this.folderLevelBookmarks = data;
			$(this.el).html(this.template({
				root: this.rootLevelBookmarks,
				folder: Object.keys(this.folderLevelBookmarks),
				labels: this.labels.toJSON()
			}));
		},
		
		// Event handler when a tile is clicked.
		onTileClicked: function(e) {
			var $target = $(e.currentTarget);
			var type = $target.data(type);
			
			
		}
	});
	
	return homeView;
});