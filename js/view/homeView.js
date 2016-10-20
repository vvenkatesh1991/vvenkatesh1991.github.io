define(['jQuery', 'underscore', 'backbone', 'handlebars', 'text!' + contextRoot + 'templates/homeView.tpl', 'collection/bookmarkCollection', 'model/staticModel', 'text!' + contextRoot + 'templates/popupTemplate.tpl', 'bootstrap'], function($, _, Backbone, Handlebars, template, bookmarks, labels, popup) {
	var homeView = Backbone.View.extend({
		// Target view dom element
		el: '#module-section',
		
		events: {
			'click .tiles' : 'onTileClicked',
			'click #Add-btn' : 'addBookmark',
			'click .delete-icon' : 'deleteClicked',
			'change .bookmark-folder' : 'folderChanged'
		},
		
		// Unbind events before binding to avoid multiple invocation.
		initialize: function() {			
			this.template = Handlebars.compile(template);
			this.popupTemplate = Handlebars.compile(popup);
			this.labels = new labels();
			var bookmark = localStorage.getItem('bookmarks');
			bookmark = JSON.parse(bookmark);
			this.bookmarks = new bookmarks(bookmark);
			this.bookmarks = this.bookmarks.toJSON();			
			this.render();
			return this;
		},
		
		// Renders the home screen.
		render: function() {			
			var data = _.groupBy(this.bookmarks, 'folder');
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
			var type = $target.data('type');
			// Check if the tile is a folder or the add bookmark tile.
			if(type === 'N') {
				$('#modal-section').html(this.popupTemplate({
					header: 'Add a bookmark',
					body: '',
					buttonText: 'Add',
					folders: Object.keys(this.folderLevelBookmarks)					
				}));
				$('#myModal').modal('show');
			}			
		},
		
		// Handler to add a new bookmark.
		addBookmark: function() {
			// Frame the new object to push.
			var folderName = undefined;
			if($('.bookmark-folder').val() === 'root')
				folderName = '';
			else if($('.bookmark-folder').val() === 'new')
				folderName = $('.bookmark-folder-name').val();
			else
				folderName = $('.bookmark-folder').val();			
			var dataToPush = {
				title: $('.bookmark-title').val(),
				url: $('.bookmark-url').val(),
				folder: folderName
			};
			//Add to collection.
			this.bookmarks.push(dataToPush);
			// Update local storage.
			localStorage.setItem('bookmarks',JSON.stringify(this.bookmarks));
			// Close modal.
			$('.modal-backdrop').remove();
			// re-render screen.
			this.render();
		},
		
		// Handler to monitor change in dropdown
		folderChanged: function(e) {
			//Show the new fields only if new folder is selected.
			if($(e.currentTarget).val() === 'new')
				$('.hide-condition').show();
			else
				$('.hide-condition').hide();
		},
		
		// Handler to delete bookmarks and folders
		deleteClicked: function(e) {					
			var $target = $(e.currentTarget);
			var $parent = $target.parents('.tiles');			
			var type = $parent.data('type');
			// If type is B, delete bookmark.
			if(type === 'B') {
				var result = confirm('Are you sure you want to delete the selected bookmark ?');
				if (!result)
					return;	
				this.bookmarks = _.reject(this.bookmarks, function(item) {
					return (item.url === $parent.find('.tool-tip').html() && item.title === $parent.find('.text').html());
				});
				// Update local storage.
				localStorage.setItem('bookmarks',JSON.stringify(this.bookmarks));				
				// re-render screen.
				this.render();
			}
			else if(type === 'F') {
				var result = confirm('When deleting a folder, all the bookmarks within it will also be deleted. Are you sure you want to delete the selected folder ?');
				if (!result)
					return;	
				this.bookmarks = _.reject(this.bookmarks, function(item) {
					return (item.folder === $parent.find('.text').html());
				});
				// Update local storage.
				localStorage.setItem('bookmarks',JSON.stringify(this.bookmarks));				
				// re-render screen.
				this.render();
			}			
		}
		
	});
	
	return homeView;
});