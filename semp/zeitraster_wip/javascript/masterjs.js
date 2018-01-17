  

  function resize() { 
  	
	let x = document.querySelector('footer').offsetHeight;
	document.querySelector("body").style.paddingBottom = x + 'px';

	//position footer at bottom of site even after resize

  }

  window.onresize = resize;
  window.onload = resize;
