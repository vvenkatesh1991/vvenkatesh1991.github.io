// Created by Venkatesh for Bookmarks app on 18-10-16.
// This file defines the main view of the home page.
// For the sake of simplicity, the app contains a single view and other features are handled in modals.
define(['jQuery', 'underscore', 'backbone', 'handlebars', 'text!' + contextRoot + 'templates/homeView.tpl', 'collection/bookmarkCollection', 'model/staticModel', 'text!' + contextRoot + 'templates/popupTemplate.tpl', 'text!' + contextRoot + 'templates/addPopupTemplate.tpl','text!' + contextRoot + 'templates/movePopup.tpl', 'bootstrap'], function($, _, Backbone, Handlebars, template, bookmarks, labels, popup, addPopup, movePopup) {
	
	// Only the best JS. :)
	'use strict'
	
	// Register a helper to solve url conflict for favicon.
	Handlebars.registerHelper('resolveURL', function(url) {
		return url.replace('http://','').replace('https://','');
	});
	
	var homeView = Backbone.View.extend({
		// Target view dom element
		el: '#module-section',
		
		// Register events associated with the view.
		events: {
			// General click handlers.
			'click .tiles' : 'onTileClicked',
			// Add clcik handlers.
			'click #Add-btn' : 'onAddBookmark',
			// Delete click handlers.
			'click .delete-icon' : 'onDeleteClicked',
			// Move click handlers.
			'click .forward-icon' : 'onMoveClicked',
			'click #Move-btn' : 'onMoveBtnClicked',
			// Edit click handlers.
			'click .edit-icon' : 'onEditClicked',
			'click #Edit-btn' : 'onEditBtnClicked',
			// Stop propagation for input click.
			'click .text-input' : 'stopPropagation',
			// Click handler of inline icon.
			'click .inline-icon' : 'inlineIconsClicked',
			// Blur event to update folder name.
			'blur .text-input' : 'onFolderNameBlur',
			// Change event handlers.
			'change .bookmark-folder' : 'onFolderChanged'
		},
		
		// Unbind events before binding to avoid multiple invocation.
		initialize: function() {			
			this.template = Handlebars.compile(template);
			this.popupTemplate = Handlebars.compile(popup);
			this.addPopupTemplate = Handlebars.compile(addPopup);
			this.movePopupTemplate = Handlebars.compile(movePopup);
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
					body: this.addPopupTemplate({
						folders: Object.keys(this.folderLevelBookmarks)	 
					}),
					buttonText: 'Add'									
				}));
				$('#myModal').modal('show');
			}
			else if(type === 'F') {	
				// Fetch the data for the particular folder.
				var data = _.where(this.bookmarks, { 
					folder: $target.find('.text').html()
				});
				$('#modal-section').html(this.popupTemplate({
					header: 'Bookmarks in ' + $target.find('.text').html() + ' folder',
					body: '',
					data: data,
					buttonText: 'Close',
					folders: Object.keys(this.folderLevelBookmarks)					
				}));
				$('#myModal').modal('show');
			}			
		},
		
		// Handler to add a new bookmark.
		onAddBookmark: function() {
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
				folder: folderName,
				id: this.generateUniqueId()
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
		onFolderChanged: function(e) {
			//Show the new fields only if new folder is selected.
			if($(e.currentTarget).val() === 'new')
				$('.hide-condition').show();
			else
				$('.hide-condition').hide();
		},
		
		// Handler to delete bookmarks and folders
		onDeleteClicked: function(e) {		
			e.stopPropagation();
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
		},
		
		// Handler to move bookmarks into a folder.
		onMoveClicked: function(e) {			
			this.moveTarget = $(e.currentTarget).parents('.tiles').data('id');
			$('#modal-section').html(this.popupTemplate({
				header: 'Move a bookmark',
				body: this.movePopupTemplate({
					folders: Object.keys(this.folderLevelBookmarks)	 
				}),
				buttonText: 'Move'									
			}));
			$('#myModal').modal('show');			
		},
		
		// Handler on click of move button.
		onMoveBtnClicked: function() {
			var moveTo = $('#move-folder').val();
			var moveID = this.moveTarget;
			$.each(this.bookmarks, function() {
				if (this.id == moveID) {
					this.folder = moveTo;
				}
			});
			// Update local storage.
			localStorage.setItem('bookmarks',JSON.stringify(this.bookmarks));
			// Close modal.
			$('.modal-backdrop').remove();
			// re-render screen.
			this.render();
		},
		
		// Handler to edit a folder/bookmark.
		onEditClicked: function(e) {
			e.stopPropagation();			
			var $parent = $(e.currentTarget).parents('.tiles');			
			var type = $parent.data('type');
			this.editTarget = $parent.data('id');
			
			if(type === 'B') {
				$('#modal-section').html(this.popupTemplate({
					header: 'Edit bookmark',
					body: this.addPopupTemplate({
						folders: Object.keys(this.folderLevelBookmarks)	 
					}),
					buttonText: 'Edit'									
				}));
				$('.bookmark-title').val($parent.find('.text').html());
				$('.bookmark-url').val($parent.find('.tool-tip').html());
				$('#myModal').modal('show');
			}
			else if(type === 'F') {
				$parent.find('.text,.text-input').toggleClass('hidden-ele');
			}
		},
		
		// Handler on click of edit button.
		onEditBtnClicked:function() {
			var editID = this.editTarget;
			var folderName = undefined;
			if($('.bookmark-folder').val() === 'root')
				folderName = '';
			else if($('.bookmark-folder').val() === 'new')
				folderName = $('.bookmark-folder-name').val();
			else
				folderName = $('.bookmark-folder').val();
			$.each(this.bookmarks, function() {
				if (this.id == editID) {
					this.title = $('.bookmark-title').val();
				    this.url = $('.bookmark-url').val();
					this.folder = folderName;
				}
			});
			// Update local storage.
			localStorage.setItem('bookmarks',JSON.stringify(this.bookmarks));
			// Close modal.
			$('.modal-backdrop').remove();
			// re-render screen.
			this.render();
		},
		
		// used to return a unique ID for each bookmark.
		generateUniqueId: function() {
			return Math.round(Math.random() * 1000000000000);
		},
		
		// Stop propagation
		stopPropagation: function(e) {
			e.stopPropagation();
		},
		
		// Update folder name.
		onFolderNameBlur: function(e) {
			e.stopPropagation();
			var $parents = $(e.currentTarget).parents('.tiles');
			var updatedName = $parents.find('.text-input').val();
			var oldName = $parents.find('.text').html();
			$parents.find('.text,.text-input').toggleClass('hidden-ele');
			$.each(this.bookmarks, function() {
				if (this.folder == oldName) {					
					this.folder = updatedName;
				}
			});
			// Update local storage.
			localStorage.setItem('bookmarks',JSON.stringify(this.bookmarks));
			// Close modal.
			$('.modal-backdrop').remove();
			// re-render screen.
			this.render();
		},
		
		// Click handler for the inline icons in folder popup.
		inlineIconsClicked: function(e) {
			var $target = $(e.currentTarget);
		}
		
	});
	
	return homeView;
});