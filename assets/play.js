//play game functions
var lenti = document.getElementById('lenti'),
    lenti_info = [
        0,      //moves
        2,      //x coordinate
        2       //y coordinate
    ],
    //postiions
    p = [],
    //lentiAnimation storage
    aniLenti;
    //touch move pointers
    t = [];


function playGame() {
    console.log('almost, my pet');

    //prepare the game screen
    var i = gls('clan')
    lenti_info[0] = 100;
    document.getElementById('movesLeft').textContent = lenti_info[0];

    //question modal?
    document.getElementById('hasQuestion').addEventListener('click', showAboutGame, false);

    //size the blocks
    var block = lgame_s.querySelector('.blocks');
    block.style.height = lgame_s.offsetWidth + 'px';
    //dimension
    var d = lgame_s.offsetWidth / 5;

    //position lenti
    p = [0, (d), (d*2), (d*3), (d*4)];
    lenti.style.top = p[lenti_info[2]] + 'px';
    lenti.style.left = p[lenti_info[1]] + 'px';
    lenti.style.height = lenti.offsetWidth + 'px';
    lenti.style.backgroundImage = 'url(' + lenti_clans[i].lenti + ')';
    lenti.style.backgroundSize = (lenti.offsetWidth * 8) + 'px auto';
    lenti.style.backgroundPositionX = 0;
    lenti.style.backgroundPositionY = 0;

    blockLoadingInit();

    //add the touch events
	block.addEventListener("touchstart", handleStart, false);
	block.addEventListener("touchend", handleEnd, false);
	block.addEventListener("touchcancel", handleCancel, false);
	block.addEventListener("touchleave", handleEnd, false);
	block.addEventListener("touchmove", handleMove, false);


    //show the game screen
    lclan_s.style.right = '100%';
    lgame_s.style.right = 0;
    aniLenti = window.setInterval(animateLentiSprite, 200);

    //start the messages

}

function handleStart(evt) {
	evt.preventDefault();
	t[0] = evt.touches[0].clientX;
	t[1] = evt.touches[0].clientY;

	console.log('touch start coordinates: ' + t[0] + ' ' + t[1]);
}
function handleEnd(evt) {
	evt.preventDefault();
	// console.log(evt);
	// var tx = evt.touches[1].clientX;
	// var ty = evt.touches[1].clientY;
	var tx = evt.changedTouches[0].screenX;
	var ty = evt.changedTouches[0].screenY;
	console.log('touch end coordinates: ' + tx + ' ' + ty);


	if (tx > t[0] && (tx - t[0] > 100)) {
		//we can move right
		console.log('moving right');
		moveLenti('right', 1);
	} else if (tx < t[0] && (t[0] - tx > 100)) {
		//we can move to the left
		console.log('moving left');
		moveLenti('left', 1);
	} else if (ty > t[1] && (ty - t[1] > 100)) {
		//we can move down
		console.log('moving down');
		moveLenti('down', 1);
	} else if (ty < t[1] && (t[1] - ty > 100)) {
		//we can move up
		console.log('moving up');
		moveLenti('up', 1);
	}
}
function handleCancel(evt) {}
function handleMove(evt) {}








//animates the Lenti
function animateLentiSprite() {
    //check what direction we should be in (0 || 1) : (right||left)
    var dir = +lenti.getAttribute('data-direction');

    //check what action we should be doing
    //(0 || 1 || 2) : (standing || walking || jumping)
    var act = +lenti.getAttribute('data-action');

    //check what sprite we should be showing (out of 8)
    var now = +lenti.getAttribute('data-sIndex');
    var nxt = (now == 7) ? 0 : now + 1;

    //change the sctuff! (0-7 means 1/7 = 14.28 iterations)
    lenti.style.backgroundPositionX = (nxt * 14.28) + '%';
    lenti.style.backgroundPositionY = whichSpriteRow(dir, act) + '%';
    lenti.setAttribute('data-sIndex', nxt);
}

function whichSpriteRow(direction, action) {
    var position;
    if (direction === 0) {
        if (action === 0) {
            position = 0; 
        } else if (action === 1) {
            position = 40;
        } else if (action === 2) {
            position = 80;
        }
    } else if (direction === 1) {
        if (action === 0) {
            position = 20; 
        } else if (action === 1) {
            position = 60;
        } else if (action === 2) {
            position = 100;
        }
    }

    return position;
}

function moveLenti(direction, count) {
	//can we move this direction
	var i = checkLentiMoveAbility(direction, count);
	console.log(i[0]);
	if (!i[0]) {
		console.log('you can\'t move there yet');
		return;
	} else if (lenti_info[0] === 0) {
		console.log('you shouldn\'t even be seeing this later, you\'re outta moves!');
		return;
	} else {
		//lets go there
		console.log('going to go to: ' + i[3] + ' ' + i[4]);
		lenti.style.top = p[i[4]] + 'px';
		lenti.style.left = p[i[3]] + 'px';

		//update the sprite position
		if (direction == 'right') {
			lenti.setAttribute('data-direction', 0);
		} else if (direction == 'left') {
			lenti.setAttribute('data-direction', 1);
		}
		lenti.setAttribute('data-action', 1);

		//when the move is over
		// var gahh = handleTransitionBrowserWars();
		var gahh = 'webkitTransitionEnd';
		// lenti.on('gahh', function() {
		// 	//update our lenti_info
		// 	lenti_info[0]--;
		// 	document.getElementById('movesLeft').textContent = lenti_info[0];
		// 	lenti_info[1] = i[3];
		// 	lenti_info[2] = i[4];

		// 	//update the sprite position
		// 	lenti.setAttribute('data-action', 0);

		// 	console.log('you\'ve done it');
		// }, false);
		window.setTimeout(function() {
			// update our lenti_info
			lenti_info[0]--;
			document.getElementById('movesLeft').textContent = lenti_info[0];
			lenti_info[1] = i[3];
			lenti_info[2] = i[4];

			//update the sprite position
			lenti.setAttribute('data-action', 0);

			console.log('you\'ve done it');
		}, 600);
	}
}

function checkLentiMoveAbility(direction, count) {
	var info = [];
	console.log('current lenti coordinates: ' + lenti_info[1] + ' ' + lenti_info[2]);

	if 	(
			(direction == 'right' && lenti_info[1] === 4) ||
			(direction == 'left' && lenti_info[1] === 0) ||
			(direction == 'up' && lenti_info[2] === 0) ||
			(direction == 'down' && lenti_info[2] === 4)
		) {
		console.log('i be called');
		info[0] = false;
	} else {
		info[0] = true;

		//fill the info with the current coordinates and the next corrdinates to go to
		info[1] = lenti_info[1];
		info[2] = lenti_info[2];
		// info[1], info[2]  =  currentX, currentY

		if (direction == 'right') {
			info[3] = (info[1] + 1);
			info[4] = info[2];
		} else if (direction == 'left') {
			info[3] = (info[1] - 1);
			info[4] = info[2];
		} else if (direction == 'up') {
			info[3] = info[1];
			info[4] = info[2] - 1;
		} else if (direction == 'down') {
			info[3] = info[1];
			info[4] = info[2] + 1;
		}
	}

	return info;
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

//populate the block with background blocks
function blockLoadingInit() {
	//set up the block with annotations
	var block = document.querySelector('.blocks');
	block.setAttribute('data-rows', '0 4');
	block.setAttribute('data-cols', '0 4');

	//fill the block in with .bs that have certain bgs
	var rows = 5, cols = 5;
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {
			var b = document.createElement('img');
			b.src = 'assets/images/bg.png';
			b.setAttribute('data-row', i);
			b.setAttribute('data-col', j);
			b.classList.add('b');
			block.appendChild(b);
		}
	}
}