<div class='container'>
	<div class='welcome-msg'>{{labels.welcomeText}}</div>
	<div class='intro-text'>{{labels.introTextOne}}</div>
	<div class='intro-text'>{{labels.introTextTwo}}</div>
	
	<div class='tiles-container'>
		<!-- Default add tile-->
		<div class='tiles' data-type='N'>
			<div class='add-icon icon'></div>
			<div class='text'>{{labels.addBookmark}}</div>
		</div>
		
		<!-- List of folders -->
		{{#each folder}}
			<div class='tiles' data-type='F'>
				<div class='folder-icon icon'></div>
				<div class='text'>{{this}}</div>
			</div>
		{{/each}}
		
		<!-- List of root level bookmarks -->
		{{#each root}}
			<div class='tiles' data-type='B'>
				<div class='fav-icon' style='background-image: url("//{{this.url}}/favicon.ico");	'></div>
				<div class='text'>{{this.url}}</div>
			</div>			
		{{/each}}
	</div>
</div>