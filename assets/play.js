//play game functions
var lentiGame = {
	'start': 0,
	'stop': 0,
	'moves': 0,
	'time': 0,
	'money': 0,
	'monsters': 0,
	'position': 10,
	'buffs': [ [0, 0], [0, 0], [0] ],
	'animate': [],
	'lenti': [0, 0, 0],
	'touch': [],
	'moving': false,
	//nothing || money || item || monster || treasure
	'chances': [ [0, 0.4], [0.4, 0.65], [0.65, 0.75], [0.75, 0.95], [0.95, 1] ],
	'blocks': []
};


function playGame() {
    var i = lenti.clan;
    //show the game screen
    ts('clan', 'game');

    //prepare the game screen
    prepareGameScreen();

    //update our Game variables
    lentiGame.moves = 15 + Math.floor(lenti.stats[2] / 5);
    lentiGame.time = 15 + Math.floor(lenti.stats[2] / 5);
    lentiGame.monsters = 0;
    lentiGame.money = 0;
    lentiGame.position = 10;
    lentiGame.buffs = [ [0, 0], [0, 0], [0] ];


    // roll the lenti into place
    window.setTimeout(function() {
    	lenti.lenti.style.left = '20%';

	    //once the lenti is in place, give the player a countdown to start playing
    	window.setTimeout(showGameStarter, 1000);
    }, 800);
}

function prepareGameScreen() {
	var view = lenti.screens.game.querySelector('.view');
	view.style.height = view.offsetWidth + 'px';

	//put in a background, and start animating it
	var b = Math.floor(Math.random() * 2);
	// var bg = (b == 1) ? 'assets/images/bg-1.png' : 'assets/images/bg-2.png'; 
	// lentiGame.animate[1] = window.setInterval(animateBg, 2000);

    //prepare the lane, and fill in the blocks
    lentiGame.blocks.length = 0;
    loadLane();

    //prepare our money
    lenti.screens.game.querySelector('.money').textContent = lentiGame.money;

    //prepare lenti
    var l = lenti.lenti;
    var i = lenti.clan;
    l.style.height = l.offsetWidth + 'px';
    l.style.backgroundImage = 'url(' + lenti_clans[i].lenti + ')';
    l.style.backgroundSize = (l.offsetWidth * 8) + 'px auto';
    l.style.backgroundPositionX = 0;
    lentiGame.lenti[1] = 1;

    //animate the lenti
    lentiGame.animate[0] = window.setInterval(animateLentiSprite, 200);
}

//populate the block with background blocks
function loadLane() {
	var lane = lenti.screens.game.querySelector('.lane');
	var w = window.innerWidth;
	lane.style.width = (w * 20) + 'px';
	lane.style.left = -(lentiGame.position * (w / 5)) + 'px';

	for (var i = 0; i < 100; i++) {
		var k = Math.floor(Math.random() * 2);
		var im = document.createElement('img');
		if (k) {
			//add an image that will have stuff here
			im.src = 'assets/images/tall-grass.png';
		} else {
			im.src = 'assets/images/grass.png';
		}
		im.style.width = w / 5 + 'px';
		lane.appendChild(im);
		lentiGame.blocks[i] = k;
	}
}

function showGameStarter() {
	//show a popup that will start the game
	var popup = document.createElement('div');
	popup.classList.add('info');
	popup.innerHTML = '<p>Collect as much as you can for the hoard! <br>start collecting</p>';

	lenti.screens.game.querySelector('.view').appendChild(popup);

	window.setTimeout(function() {
		popup.style.opacity = 1;
	}, 200);

	//make it clickable
	popup.addEventListener('click', startGame, false);
}

function startGame() {
	//remove the popup
	var p = lenti.screens.game.querySelector('.info');
	p.style.opacity = 0;

	window.setTimeout(function() {
		var view = lenti.screens.game.querySelector('.view');
		view.removeChild(p);

		//start the timer countdown
		lentiGame.animate[1] = window.setInterval(timeCountdown, 1000);

		//start the animating of the lane and background
		lentiGame.animate[2] = window.setInterval(animateLane, 500);

		//add event listeners
		lentiGame.moving = true;
		addTouch(view);

	}, 500);
}










function checkWhatHappens() {
	//check where we are
	var p = lentiGame.position;
	//does it have anything?
	var populated = lentiGame.blocks[p];

	if (populated) {
		//lets see what happens?
		var what = checkChances(lentiGame.chances);

		switch (what) {
			case 0:
				var i = Math.floor(Math.random() * nothing_messages.length);
				writeMemo(nothing_messages[i]);
				
				//we potentially used an item for money multipling, 
				//which gets used every turn, regardless of finding money or not
				updateMoneyBuff();
				
				resume();
				break;
			case 1:
				foundMoney();
				updateMoneyBuff();
				
				break;
			case 2:
				foundItem();
				break;
			case 3:
				foundMonster();
				updateMoneyBuff();
				
				break;
			case 4:
				foundTreasure();
				updateMoneyBuff();
				
				break;
			default:
				console.log('found nothing, but check your checkchances');
				break;
		}


		//update the block info and image
		lentiGame.blocks[p] = 0;
		lenti.screens.game.querySelector('.lane').children[p].src = 'assets/images/grass.png';
	} else {
		console.log('nothing is here');

		//write a small message that tells us there is nothing there
		var i = Math.floor(Math.random() * nothing_messages.length);
		writeMemo(nothing_messages[i]);

		//start everything up again
		resume();
	}
}

function resume() {
	lentiGame.lenti[1] = 1;
	lentiGame.animate[1] = window.setInterval(timeCountdown, 1000);
	lentiGame.animate[2] = window.setInterval(animateLane, 500);
}

function removeTouch(what) {
	what.removeEventListener("touchstart", handleStart, false);
	what.removeEventListener("touchend", handleEnd, false);
	what.removeEventListener("touchcancel", handleCancel, false);
	what.removeEventListener("touchleave", handleEnd, false);
	what.removeEventListener("touchmove", handleMove, false);
}

function addTouch(what) {
	what.addEventListener("touchstart", handleStart, false);
	what.addEventListener("touchend", handleEnd, false);
	what.addEventListener("touchcancel", handleCancel, false);
	what.addEventListener("touchleave", handleEnd, false);
	what.addEventListener("touchmove", handleMove, false);
}











function foundMoney() {
	console.log('you found some money');

	//you are very excited about this
	lentiGame.lenti[2] = 0;
	lentiGame.lenti[1] = 2;
	
	//how much money do we find?
	var money = Math.floor(Math.random() * 10) + 1;

	//what is you money collecting ability?
	var a = lenti.stats[0] + lentiGame.buffs[0][0];

	//how much money does your fine ass collect?
	var moreMoney = Math.ceil(money * ( 1 + (Math.floor(a / 10) * 0.2)));
	lentiGame.money += moreMoney;
	lenti.screens.game.querySelector('.money').textContent = lentiGame.money;

	// updateMoneyBuff();

	writeMemo('you found some gold');
	
	//let us resume
	window.setTimeout(function() {
		lentiGame.lenti[2] = 0;
		lentiGame.lenti[1] = 0;
		resume();
	})
}








function writeGameMessage(type, input) {
	var ms = document.getElementById('game_messages');
	var m = document.createElement('li');

	switch (type) {
		case 'item':
			var str = 'You found a <strong>' + input.name + '</strong>. ' + input.message;
			m.innerHTML = str;
			break;
		case 'money':
			var str = '<strong>' + input + ' gold coins</strong>. Booyah.'
			m.innerHTML = str;
			break;
		case 'nothing':
			m.textContent = input;
			break;
		case 'monster':
			var str = 'A <strong>' + input.name + '</strong> attacks you. ' + input.message;
			m.innerHTML = str;
			break;
		default:
			console.log('working on it');
			break;
	}

	ms.appendChild(m);
	//keep the message list as far to the bottom as possible
	ms.scrollTop = ms.scrollHeight;
}

function writeMemo(memo) {
	//create the memo
	var m = document.createElement('p');
	m.classList.add('memo');
	m.textContent = memo;

	//add it to the screen
	lenti.screens.game.querySelector('.view').appendChild(m);

	//after 3 seconds... no, 1 second!
	window.setTimeout(function() {
		var m = lenti.screens.game.querySelector('.view').querySelector('.memo');
		lenti.screens.game.querySelector('.view').removeChild(m);
	}, 1000);
}

function writePopup(what, arr) {
	//show a popup that will start the game
	var popup = document.createElement('div');
	popup.classList.add('info');

	//remove the touch events for the view
	var view = lenti.screens.game.querySelector('.view');
	removeTouch(view);

	if (what === 'item') {
		popup.innerHTML = '<span>You found</span><h2>' + arr.name + '</h2><p>' + arr.message + '</p>';
	} else if (what === 'monster') {
		popup.innerHTML = '<p>A <strong>' + arr.name + '</strong> attacks you. <br>' + arr.message + '</p>';
	} else if (what === 'treasure') {
		popup.innerHTML = '<p>You found some treasure!</p>';
	}

	lenti.screens.game.querySelector('.view').appendChild(popup);
	window.setTimeout(function() {
		popup.style.opacity = 1;
	}, 200);

	//make it clickable
	popup.addEventListener('click', removePopup, false);
}

function removePopup() {
	//remove the popup
	// var p = lenti.screens.game.getElementsByClassName('.info');
	var p = this;
	p.style.opacity = 0;

	if (lentiGame.time <= 0) {
		endGame('poop');
	} else {
		window.setTimeout(function() {
			var p = lenti.screens.game.getElementsByClassName('info');
			var v = lenti.screens.game.querySelector('.view');
			removeElem(v, p);
			console.log('has it been removed?');

			//add back the touch events
			var view = lenti.screens.game.querySelector('.view');
			addTouch(view);

			resume();
			lentiGame.moving = true;
		}, 500);
	}

}






//animates the Lenti, background, and lane
function animateLentiSprite() {
    //check what direction we should be in (0 || 1) : (right||left)
    var dir = lentiGame.lenti[0];


    //check what action we should be doing
    //(0 || 1 || 2) : (standing || walking || jumping)
    var act = lentiGame.lenti[1];

    //check what sprite we should be showing (out of 8)
    var now = lentiGame.lenti[2];
    var nxt = (now == 7) ? 0 : now + 1;

    //change the sctuff! (0-7 means 1/7 = 14.28 iterations)
    lenti.lenti.style.backgroundPositionX = (nxt * 14.28) + '%';
    lenti.lenti.style.backgroundPositionY = whichSpriteRow(dir, act) + '%';
    lentiGame.lenti[2] = nxt;
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

function animateLane() {
	//where should the lane be sitting?
	var w = window.innerWidth;
	var lane = lenti.screens.game.querySelector('.lane');
	lane.style.left = -(lentiGame.position * (w / 5)) + 'px';

	//update our position
	if (lentiGame.lenti[0] === 0) {
		//we're facing right, and going right
		lentiGame.position++;
	} else {
		//we're facing left
		lentiGame.position--;
	}
}

function timeCountdown() {
	//how much time do we have total?
	var t = lentiGame.moves;

	//how much time do we have left?
	var l = lentiGame.time;

	//change the style of the timer to reflect this
	document.getElementById('timer').style.right = (100 - (100 * (l / t))) + '%';

	if (lentiGame.time <= 0) {
		endGame('no more time');
	} else {
		lentiGame.time--;
	}

	//
}

function animateBg() {}















function endGame(message) {
	console.log('the game should end now');
	lenti.rounds++;

	//stop the moving
	window.clearInterval(lentiGame.animate[1]);
	window.clearInterval(lentiGame.animate[2]);
	lentiGame.lenti[1] = 0;
	moving = false;

	//check for things
	var achieved = checkForAchievement();
	console.log('achievements achieved: ' + achieved.length);
	console.log('treasures gotten: ' + endGameTreasures.length);

	if (message) {
		console.log(message);
	} else {
		console.log('a normal ending');
	}

	//empty things
	// var ms = document.getElementById('game_messages');
	// ms.innerHTML = '';

	//show the end screen with data about this round
	// lenti.screens.modal.style.right = 0;

	//update our storage and localStorage

	//transition to the next screen
	// document.getElementById('backToClan').addEventListener('click', goBackToClan, false);

	//empty the blocks
	// var b = document.getElementsByClassName('b');
	// for (var i = 0; i < b.length; i++) {
	// 	b[i].parentNode.removeChild(b[i]);
	// }
}
function goBackToClan() {
	//transition to the next screen
	lenti.screens.modal.style.right = '-100%';
	lenti.screens.game.style.right = '-100%';
	lenti.screens.clan.style.right = 0;

	document.getElementById('backToClan').removeEventListener('click', goBackToClan, false);
}