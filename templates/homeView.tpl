<div class='container'>
	<div class='welcome-msg'>{{labels.welcomeText}}</div>
	<div class='intro-text'>{{labels.introTextOne}}</div>
	<div class='intro-text'>{{labels.introTextTwo}}</div>
	
	<div class='tiles-container'>
		<!-- Default add tile-->
		<div class='tiles cursor-pointer ' data-type='N' title='Click here to add a new bookmark'>
			<div class='add-icon icon'></div>
			<div class='text'>{{labels.addBookmark}}</div>
		</div>
		
		<!-- List of folders -->
		{{#each folder}}
			<div class='tiles cursor-pointer ' data-type='F'>
				<div class='folder-icon icon'></div>
				<div class='text'>{{this}}</div>
				<input class='text-input hidden-ele' value='{{this}}'/>
				<div class='delete-icon hidden-ele' title='Delete this folder'></div>
				<div class='edit-icon hidden-ele' title='Edit folder name'></div>				
			</div>
		{{/each}}
		
		<!-- List of root level bookmarks -->
		{{#each root}}
			<div class='tiles' data-type='B' data-id='{{this.id}}'>
				<div class='fav-icon' style='background-image: url("//{{resolveURL this.url}}/favicon.ico");'></div>
				<div class='text'>{{this.title}}</div>
				<div class='tool-tip hidden-ele'>{{this.url}}</div>
				<div class='delete-icon hidden-ele' title='Delete this bookmark'></div>
				<div class='edit-icon hidden-ele' title='Edit this bookmark'></div>
				<div class='forward-icon hidden-ele' title='Move this bookmark'></div>
			</div>			
		{{/each}}
	</div>
</div>
<!-- Section for the popup -->
<div id='modal-section'></div>