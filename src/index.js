import './css/style.less';
if(document.querySelectorAll('a').length){
	require([],() =>{
		const Button = require('./components/Button').default;
	    const button = new Button('http://google.com');
	    button.render('a');
	});
}

if(document.querySelectorAll('h1').length){
   require([],() =>{
   		const Header = require('./components/Header').default;
   		const header = new Header();
   		header.render('h1');
   });
}