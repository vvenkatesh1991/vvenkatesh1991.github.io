// Configure various lib files.
require.config({
    paths: {
        'jQuery': 'lib/jquery/jquery-3.1.1.min',
        'underscore': 'lib/underscore/underscore-min',
		'backbone' : 'lib/backbone/backbone-min',
		'handlebars' : 'lib/handlebars/handlebars',
		'text' : 'lib/text/text',
		'bootstrap' : 'lib/bootstrap/bootstrap'
    },
	 backbone: {
      deps: ["use!underscore", "jquery"],
      attach: "Backbone"  //attaches "Backbone" to the window object
    },
    shim: {
        'jQuery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
		'backbone': {
			deps: ['underscore', 'jQuery'],           
            exports: 'Backbone'
		}
    },
	waitSeconds: 0
});

// Single point of entry to the App.
require(['jQuery', 'router'], function ($,router) {
   $(document).ready(function() {
	   contextRoot = window.location.pathname;
	   contextRoot = contextRoot.replace('index.html','');
	   window.location.href = '#home';
   });
});

