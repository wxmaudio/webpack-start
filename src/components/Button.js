import $ from 'jquery';
import Mustache from 'mustache';
//import template from './Button.html';
//import './Button.less';

/*
* Class Button
*
*/
export default class Button{
	constructor(link){
		this.link = link;
	}
	onClick(e){
		e.preventDefault();
		alert(this.link);
	}

	render(node){

		const text = node;
		let html = Mustache.render(template,{text});
		$("body").append(html);

		$('.button').click(this.onClick.bind(this));
	}
}