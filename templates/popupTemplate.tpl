<!-- Modal -->
<div class="modal fade" id="myModal" role="dialog">
  <div class="modal-dialog modal-sm">
	<div class="modal-content">
	  <div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">&times;</button>
		<h4 class="modal-title">{{header}}</h4>
	  </div>
	  <div class="modal-body">
		{{body}}
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
	  </div>
	  <div class="modal-footer">
		<button id='{{buttonText}}-btn' type="button" class="btn btn-default" data-dismiss="modal">{{buttonText}}</button>
	  </div>
	</div>
  </div>
</div>