
if(document.querySelectorAll('a').length){
	require([],() =>{
		var Button = require('./components/Button').default;
	    var button = new Button('google.com');
	    button.render('a');
	});
}