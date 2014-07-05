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
// var lenti = document.getElementById('lenti'),
//     lenti_info = [
//         0,      //moves
//         2,      //x coordinate
//         2,      //y coordinate
//         [		//buffs
//         	[1, 0], //money multiplier 
//         	[1, 0], //damage reducer
//         	[0]		//move count
//         ]
//     ],
//     //postiions
//     p = [],
//     //animation setInterval storage
//     aniLenti,
//     //touch move pointers
//     t = [],
//     moving = false,
//     //what can happen
//     //nothing || money || item || monster || treasure
//     whatCanHappen = [ [0, 0.4], [0.4, 0.65], [0.65, 0.75], [0.75, 0.95], [0.95, 1] ];


function playGame() {
    var i = lenti.clan;
    //show the game screen
    ts('clan', 'game');

    //prepare the game screen
    prepareGameScreen();

    //update our Game variables
    lentiGame.moves = 15 + Math.floor(lenti.stats[2] / 5);
    lentiGame.time = 15 + Math.floor(lenti.stats[2] / 5);


    // roll the lenti into place
    window.setTimeout(function() {
    	lenti.lenti.style.left = '20%';

    	window.setTimeout(showGameStarter, 1000);
    }, 800);

    //once the lenti is in place, give the player a countdown to start playing

    //add event listeners

    //start playing
 //    lenti_info[0] = lenti_clans[i].ability[2];
 //    document.getElementById('movesLeft').textContent = lenti_info[0];

 //    //prepare the rest of the buffs
 //    lenti_info[3][0][0] = lenti_clans[i].ability[0];
 //    lenti_info[3][1][0] = lenti_clans[i].ability[1];

 //    //question modal?
 //    document.getElementById('hasQuestion').addEventListener('click', showAboutGame, false);

 //    //size the blocks
 //    var block = lenti.screens.game.querySelector('.blocks');
 //    block.style.height = lenti.screens.game.offsetWidth + 'px';
 //    //size the messages
 //    document.getElementById('game_messages').style.height = (window.innerHeight - lenti.screens.game.children[0].offsetHeight - lenti.screens.game.children[1].offsetHeight - 16) + 'px';

 //    //dimension
 //    var d = lenti.screens.game.offsetWidth / 5;

 //    //position lenti
 //    p = [0, (d), (d*2), (d*3), (d*4)];
 //    lenti.style.top = p[lenti_info[2]] + 'px';
 //    lenti.style.left = p[lenti_info[1]] + 'px';
 //    lenti.style.height = lenti.offsetWidth + 'px';
 //    lenti.style.backgroundImage = 'url(' + lenti_clans[i].lenti + ')';
 //    lenti.style.backgroundSize = (lenti.offsetWidth * 8) + 'px auto';
 //    lenti.style.backgroundPositionX = 0;
 //    lenti.style.backgroundPositionY = 0;

 //    blockLoadingInit();

 //    //add the touch events
	// block.addEventListener("touchstart", handleStart, false);
	// block.addEventListener("touchend", handleEnd, false);
	// block.addEventListener("touchcancel", handleCancel, false);
	// block.addEventListener("touchleave", handleEnd, false);
	// block.addEventListener("touchmove", handleMove, false);


 //    //show the game screen
 //    lenti.screens.clan.style.right = '100%';
 //    lenti.screens.game.style.right = 0;
    // aniLenti = window.setInterval(animateLentiSprite, 200);

    //start the messages

}

function prepareGameScreen() {
	var view = lenti.screens.game.querySelector('.view');
	view.style.height = view.offsetWidth + 'px';

	//put in a background, and start animating it
	var b = Math.floor(Math.random() * 2);
	// var bg = (b == 1) ? 'assets/images/bg-1.png' : 'assets/images/bg-2.png'; 
	// lentiGame.animate[1] = window.setInterval(animateBg, 2000);

    //prepare the lane, and fill in the blocks
    loadLane();

    //how much time do we have?

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








//animates the Lenti
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
		lenti.screens.game.querySelector('.view').removeChild(p);

		//start the timer countdown
		lentiGame.animate[1] = window.setInterval(timeCountdown, 1000);

		//start the animating of the lane and background
		lentiGame.animate[2] = window.setInterval(animateLane, 500);

		//add event listeners

	}, 500);
}

function timeCountdown() {
	//how much time do we have total?
	var t = lentiGame.moves;

	//how much time do we have left?
	var l = lentiGame.time;

	//change the style of the timer to reflect this
	document.getElementById('timer').style.right = (100 - (100 * (l / t))) + '%';
	lentiGame.time--;
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

function checkWhatHappens() {
	//check where we are
	var px = lenti_info[1],
		py = lenti_info[2],
		current = checkForCurrent(px, py);

	//has it been visited?
	var visited = current.classList.contains('visited') ? true : false;

	//what is going to happen
	var whatsFound = checkChances(whatCanHappen);
	if (whatsFound == 1 && visited) {
		//can't find money here yet
		whatsFound == 0;
	}
	switch (whatsFound) {
		case 0:
			console.log('nothing here');
			var howMany = nothing_messages.length;
			var which = Math.floor(Math.random() * howMany);
			writeGameMessage('nothing', nothing_messages[which]);
			break;
		case 1:
			foundMoney();
			break;
		case 2:
			foundItem();
			break;
		case 3:
			foundMonster();
			break;
		case 4:
			foundTreasure();
			break;
		default:
			console.log('found nothing, but check your checkchances');
			break;
	}
	if (!visited) {
		current.classList.add('visited');
		var img = current.src;
		current.src = img.replace('.png', '-visited.png');
		current.setAttribute('data-countdown', 3);
	} else {
		//you need to give the block time to regnerate
		//it's like you come back to trample budding flowers
		//give it some time grow into a string flower
		current.setAttribute('data-countdown', 3);
	}

}
function checkForCurrent(posX, posY) {
	var b = document.getElementsByClassName('b');
	var send;
	for (var i = 0; i < b.length; i++) {
		var checkX = +b[i].getAttribute('data-col'),
			checkY = +b[i].getAttribute('data-row');
		if (checkX == posX && checkY == posY) {
			send = b[i];
			return send;
		}
	}
}










function foundMoney() {
	console.log('you found some money');
	//how much money do we find?
	var money = Math.floor(Math.random() * 10) + 1;

	//does it get multiplied by a buff?
	var moreMoney = Math.ceil(lenti_info[3][0][0] * money);
	// console.log('you get ' + moreMoney + ' gold coins');
	writeGameMessage('money', moreMoney);
}
function foundMonster() {
	console.log('a monster attacks you');

	//what monster is it?
	var which = checkChances(lenti_monster_chance);
	var monster = lenti_monsters[which];
	console.log(monster.name);

	//how much damage do we take? incorporate buffs...
	console.log('life at: ' + lenti_info[0]);
	var damage = monster.action[2];
	console.log(damage);
	var realDamage;
	switch (monster.action[0]) {
		case 'moves':
			if (monster.action[1] == 'base') {
				realDamage = Math.ceil(damage * lenti_info[3][1][0]);
				lenti_info[0] -= realDamage;
			} else if (monster.action[1] == 'multiplier') {
				realDamage = damage * lenti_info[3][1][0];
				lenti_info[0] *= realDamage;
				lenti_info[0] = Math.floor(lenti_info[0]);
			}
			document.getElementById('movesLeft').textContent = lenti_info[0];
			console.log(realDamage);

			break;

		default:
		console.log('check your foundMonster');
	}

	//animate the monster and the lenti

	//write a message about it
	writeGameMessage('monster', monster);

	//reduce any buffs applicable
	if (!(lenti_info[3][1][0] === 0)) {
		lenti_info[3][1][0]--;
	}
	
	if (lenti_info[0] <= 0) {
		endGame('you were killed in action');
	}
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















function endGame(message) {
	console.log('the game should end now');
	//make the lenti die
	window.clearInterval(aniLenti);
	moving = false;
	lenti_info[1] = 2;
	lenti_info[2] = 2;

	//empty things
	var ms = document.getElementById('game_messages');
	ms.innerHTML = '';

	//show the end screen with data about this round
	lenti.screens.modal.style.right = 0;

	//update our storage and localStorage

	//transition to the next screen
	document.getElementById('backToClan').addEventListener('click', goBackToClan, false);

	//empty the blocks
	var b = document.getElementsByClassName('b');
	for (var i = 0; i < b.length; i++) {
		b[i].parentNode.removeChild(b[i]);
	}
}
function goBackToClan() {
	//transition to the next screen
	lenti.screens.modal.style.right = '-100%';
	lenti.screens.game.style.right = '-100%';
	lenti.screens.clan.style.right = 0;

	document.getElementById('backToClan').removeEventListener('click', goBackToClan, false);
}