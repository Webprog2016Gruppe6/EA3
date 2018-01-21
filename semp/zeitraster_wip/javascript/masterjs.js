  



/* function to take care of the resizeing, so that the padding-bottom will be refreshed.
is necessary in order to keep the footer at the bottom  */

function resize() { 

	let x = document.querySelector('footer').offsetHeight;
	document.querySelector("body").style.paddingBottom = x + 'px';

}

window.onresize = resize;
window.onload = resize;
