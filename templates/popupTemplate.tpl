<!-- Modal -->
<div class="modal fade" id="myModal" role="dialog">
  <div class="modal-dialog modal-sm">
	<div class="modal-content">
	  <div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">&times;</button>
		<h4 class="modal-title">{{header}}</h4>
	  </div>
	  <div class="modal-body">
		{{{body}}}	
		{{#each data}}
			<div class='row dotted'>
				<div class='fav-icon-small left' style='background-image: url("//{{resolveURL this.url}}/favicon.ico");'></div> 
				<div class='left list-data-one'>{{this.title}}</div>
				<div class='left list-data-two'>{{this.url}}</div>
				<div class='right delete-inline inline-icon' data-icon='D' title='Delete this bookmark'></div>
				<div class='right edit-inline inline-icon' data-icon='E' title='Edit this bookmark'></div>
				<div class='right move-inline inline-icon' data-icon='M' title='Move this bookmark'></div>				
			</div>
		{{/each}}
	  </div>
	  <div class="modal-footer">
		<button id='{{buttonText}}-btn' type="button" class="btn btn-default" data-dismiss="modal">{{buttonText}}</button>
	  </div>
	</div>
  </div>
</div>