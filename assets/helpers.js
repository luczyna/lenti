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





// touch functions
function handleStart(evt) {
	// console.log('i\'m touching you');
	evt.preventDefault();

	//pause the lenti and the lane from moving, pause the timer
	// window.clearInterval(lentiGame.animate[0]);
	lentiGame.lenti[1] = 0; 
	window.clearInterval(lentiGame.animate[1]);
	window.clearInterval(lentiGame.animate[2]);
	lentiGame.moving = false;

	//log where we touched
	lentiGame.touch[0] = evt.touches[0].clientX;
	lentiGame.touch[1] = evt.touches[0].clientY;

	// console.log('touch start coordinates: ' + t[0] + ' ' + t[1]);
	// console.log('pausing to see this spot');
}
function handleEnd(evt) {
	evt.preventDefault();

	//log where we stopped touching
	lentiGame.touch[2] = evt.changedTouches[0].screenX;
	lentiGame.touch[3] = evt.changedTouches[0].screenY;
	// console.log('touch end coordinates: ' + tx + ' ' + ty);

	if (!lentiGame.moving) {
		if (lentiGame.touch[3] - lentiGame.touch[1] > 100) {
			//we favor action
			//swiping down means to check the item
			checkWhatHappens();
			// console.log('checking what we find in this area');
		} else {
			//now we check swipe direction
			if (lentiGame.touch[2] - lentiGame.touch[0] > 100) {
				//we swiped to the right
				//we change directions to the right
				lentiGame.lenti[0] = 0;
			} else if (lentiGame.touch[0] - lentiGame.touch[2] > 100) {
				//we swiped to the left
				lentiGame.lenti[0] = 1;
			}

			//regardless of directions changing or not, we start moving again
			lentiGame.lenti[1] = 1;
			// lentiGame.animate[0] = window.setInterval(animateLentiSprite, 200);
			lentiGame.animate[1] = window.setInterval(timeCountdown, 1000);
			lentiGame.animate[2] = window.setInterval(animateLane, 500);

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


function removeElem(parent, elem) {
	for (var i = elem.length; i > 0; i--) {
		
		parent.removeChild(elem[i - 1]);
	}
}