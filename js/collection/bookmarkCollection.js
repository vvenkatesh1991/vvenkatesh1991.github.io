// This collection defines a group of bookmark models.
define(['jQuery', 'underscore', 'backbone', 'model/bookmarkModel'], function($, _, Backbone, bookmarkModel) {
	var bookmarkModel = Backbone.Collection.extend({
		model: bookmarkModel
	});
	
	return bookmarkModel;
});