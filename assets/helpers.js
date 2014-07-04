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

// function transitionScreen(from, to) {
// 	lenti.screens[to].style.display = 'block';
// 	lenti.screens[to].style.opacity = 1;
//     lenti.screens[to].style.right = 0;
	
// 	lenti.screens[to].addEventListener('transitionend', function() {
// 		console.log('start the poop show');
// 		lenti.screens[from].style.right = '100%';
// 		lenti.screens[from].style.opacity = 0;

// 	    lenti.screens[from].addEventListener('transitionend', function() {
// 	    	console.log('it is finished');
	    	
// 	    	lenti.screens[from].style.display = 'none';
// 			lenti.screens[from].style.opacity = 1;
// 	    	return true;
// 	    }, false);
// 	}, false);
// }
function ts(from, to) {
	lenti.screens[from].style.opacity = 0;
    lenti.screens[to].style.display = 'block';
    //yeah, we shouldn't be doing this with setTimeout, but WHATEVER
	window.setTimeout(finishTS, 300, [from, to]);
}
function finishTS(arr) {
	var from = arr[0];
	var to = arr[1];

	// console.log('poop is here')
	lenti.screens[from].style.display = 'none';
    lenti.screens[to].style.opacity = 1;
    // console.log('why poop why?');
}

function handleTransitionBrowserWars() {
	var transitionString;

	if('ontransitionend' in window) {
		// Firefox
		transitionString = 'transitionend';
	} else if('onwebkittransitionend' in window) {
		// Chrome/Saf (+ Mobile Saf)/Android
		transitionString = 'onwebkittransitionend';
	} else if('onotransitionend' in window || navigator.appName == 'Opera') {
		// Opera
		// As of Opera 10.61, there is no "onotransitionend" property added to DOM elements,
		// so it will always use the navigator.appName fallback
		transitionString = 'oTransitionEnd';
	} else {
		// IE - not implemented (even in IE9) :(
		transitionString = false;
	}

	console.log(transitionString);
	return transitionString;
}






// touch functions
function handleStart(evt) {
	evt.preventDefault();
	t[0] = evt.touches[0].clientX;
	t[1] = evt.touches[0].clientY;

	// console.log('touch start coordinates: ' + t[0] + ' ' + t[1]);
}
function handleEnd(evt) {
	evt.preventDefault();
	// console.log(evt);
	// var tx = evt.touches[1].clientX;
	// var ty = evt.touches[1].clientY;
	var tx = evt.changedTouches[0].screenX;
	var ty = evt.changedTouches[0].screenY;
	// console.log('touch end coordinates: ' + tx + ' ' + ty);


	if (!moving) {
		if (tx > t[0] && (tx - t[0] > 100)) {
			//we can move right
			// console.log('moving right');
			moveLenti('right', 1);
		} else if (tx < t[0] && (t[0] - tx > 100)) {
			//we can move to the left
			// console.log('moving left');
			moveLenti('left', 1);
		} else if (ty > t[1] && (ty - t[1] > 100)) {
			//we can move down
			// console.log('moving down');
			moveLenti('down', 1);
		} else if (ty < t[1] && (t[1] - ty > 100)) {
			//we can move up
			// console.log('moving up');
			moveLenti('up', 1);
		}
	} else {
		console.log('slow youself down');
	}
}
function handleCancel(evt) {}
function handleMove(evt) {}

//keyboard events
document.onkeydown = function(e) {
	//only if we are playing

	if (lenti.screens.game.style.right == '0px') {
	    e = e || window.event;
	    switch(e.which || e.keyCode) {
	        case 37: // left
	        moveLenti('left', 1);
	        break;

	        case 38: // up
	        moveLenti('up', 1);
	        break;

	        case 39: // right
	        moveLenti('right', 1);
	        break;

	        case 40: // down
	        moveLenti('down', 1);
	        break;

	        default: return; // exit this handler for other keys
	    }
	    e.preventDefault(); // prevent the default action (scroll / move caret)
	}
}

//chance checkers
function checkChances(input) {
	var random = Math.random();
	for (var i = 0; i < input.length; i++) {
		if (
			random > input[i][0] &&
			random <= input[i][1]
			) {
			//this it the value that should be returned
			return i;
		}
	}
}