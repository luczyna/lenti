/* helper functions */

function removeClass(elements, cls) {
	for (var i = 0; i < elements.length; i++) {
		elements[i].classList.remove(cls);
	}
}

function addClass(elements, cls) {
	for (var i = 0; i < elements.length; i++) {
		elements[i].classList.add(cls);
	}
}

function gls(what) {
	//get local storage
	var getThis = 'lenti-' + what;
	return window.localStorage[getThis];
}

function sls(what, value) {
	//set local storage
	var setThis = 'lenti-' + what;
	window.localStorage[setThis] = value;
}