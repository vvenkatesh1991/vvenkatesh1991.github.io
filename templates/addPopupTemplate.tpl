<div class='row'>
	<span>Title:</span>&nbsp
	<input type='text' maxlength=25 class='bookmark-title'/>
</div>
<div class='row'>
	<span>Website URL:</span>&nbsp
	<input type='text' maxlength=45 class='bookmark-url'/>
</div>
<div class='row'>
	<span>Add to folder:</span>&nbsp
	<select class='bookmark-folder'>
		<option value='root'>Root Level</option>
		{{#each folders}}
			<option value='{{this}}'>{{this}}</option>
		{{/each}}
		<option value='new'>Add a new folder</option>
	</select>
</div>
<div class='row hide-condition' style='display: none;'>
	<span>Folder name:</span>&nbsp
	<input type='text' maxlength=25 class='bookmark-folder-name'/>
</div>