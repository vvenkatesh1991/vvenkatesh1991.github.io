// This model defines the static labels to be used in the application.
define(['jQuery', 'underscore', 'backbone'], function($, _, Backbone) {
	var staticModel = Backbone.Model.extend({
		defaults: {
			welcomeText: 'Welcome Alex Lin !',
			introTextOne: 'BookMySite is a fast, no-nonsense bookmarking site for people who value privacy and speed.',
			introTextTwo: 'You can bookmark from any browser and sync accounts.',
			addBookmark: 'Add new bookmark'
		}
	});
	
	return staticModel;
});