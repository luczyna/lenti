//play game functions
var lenti = document.getElementById('lenti'),
    lenti_info = [
        0,      //moves
        2,      //x coordinate
        2,      //y coordinate
        [		//buffs
        	[1, 0], //money multiplier 
        	[1, 0], //damage reducer
        	[0]		//move count
        ]
    ],
    //postiions
    p = [],
    //animation setInterval storage
    aniLenti,
    //touch move pointers
    t = [],
    moving = false,
    //what can happen
    //nothing || money || item || monster || treasure
    whatCanHappen = [ [0, 0.4], [0.4, 0.65], [0.65, 0.75], [0.75, 0.95], [0.95, 1] ];


function playGame() {
    //prepare the game screen
    var i = gls('clan');
    lenti_info[0] = lenti_clans[i].ability[2];
    document.getElementById('movesLeft').textContent = lenti_info[0];

    //prepare the rest of the buffs
    lenti_info[3][0][0] = lenti_clans[i].ability[0];
    lenti_info[3][1][0] = lenti_clans[i].ability[1];

    //question modal?
    document.getElementById('hasQuestion').addEventListener('click', showAboutGame, false);

    //size the blocks
    var block = lgame_s.querySelector('.blocks');
    block.style.height = lgame_s.offsetWidth + 'px';
    //size the messages
    document.getElementById('game_messages').style.height = (window.innerHeight - lgame_s.children[0].offsetHeight - lgame_s.children[1].offsetHeight - 16) + 'px';

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
    // aniLenti = window.setInterval(animateLentiSprite, 200);

    //start the messages

}










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
	if (!i[0]) {
		console.log('you can\'t move there yet');
		return;
	} else if (lenti_info[0] === 0) {
		console.log('you shouldn\'t even be seeing this later, you\'re outta moves!');
		return;
	} else {
		//we're moving, I don't want crazy players breaking teh game
		moving = true;
		//update the block countdowns
		refreshBlock();

		//lets go there
		// console.log('going to go to: ' + i[3] + ' ' + i[4]);
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
		window.setTimeout(function() {
			// update our lenti_info
			//was this our last move?
			if (lenti_info[0] === 1) {
				//end the game
				endGame();
			} else {
				//keep going
				lenti_info[0]--;
				document.getElementById('movesLeft').textContent = lenti_info[0];
				lenti_info[1] = i[3];
				lenti_info[2] = i[4];

				//update the sprite position
				lenti.setAttribute('data-action', 0);

				console.log('you\'ve done it');
				//now let's see what happens?
				checkWhatHappens();
				updateBuffs();
				moving = false;
			}
		}, 600);
	}
}

function checkLentiMoveAbility(direction, count) {
	var info = [];
	// console.log('current lenti coordinates: ' + lenti_info[1] + ' ' + lenti_info[2]);

	if 	(
			(direction == 'right' && lenti_info[1] === 4) ||
			(direction == 'left' && lenti_info[1] === 0) ||
			(direction == 'up' && lenti_info[2] === 0) ||
			(direction == 'down' && lenti_info[2] === 4)
		) {
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
//refresh the blocks so you can find money there after 3 turns
function refreshBlock() {
	var b = document.getElementsByClassName('b');
	for (var i = 0; i < b.length; i++) {
		//does it have the class of visited
		if (b[i].classList.contains('visited')) {
			// console.log('updating a block');
			var moves = +b[i].getAttribute('data-countdown');
			// console.log(moves + ': ' + b[i]);

			if (moves == 1) {
				b[i].setAttribute('data-countdown', 3);
				b[i].classList.remove('visited');

				//update the image
				var revertImage = b[i].src;
				var im = revertImage.replace('-visited', '');
				b[i].src = im;
			} else {
				b[i].setAttribute('data-countdown', (moves - 1));
			}
		}
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
}
function foundItem() {
	console.log('you found an item');

	//what are we going to get?
	var tier = checkChances(lenti_item_chance);
	var which = Math.floor(Math.random() * 3);
	var item = lenti_items[tier][which];

	console.log('you found a \b ' + item.name);

	//now what happens?
	itemBuffs(item.action);
	writeGameMessage('item', item);
}
function foundTreasure() {
	console.log(' WOW !!  you found some treasure!');
}




function itemBuffs(itemInfo) {
	var what = itemInfo[0];
	var how = itemInfo[1];
	// money and protection have a duration element
	// var duration = itemInfo[2]

	if (what == 'money') {
		//update your money buff
		lenti_info[3][0][0] *= how;
		lenti_info[3][0][1] += itemInfo[2];
	} else if (what == 'protect') {
		//update your protection
		lenti_info[3][1][0] *= how;
		lenti_info[3][1][1] += itemInfo[2];
	} else if (what == 'moves') {
		//update your moves
		lenti_info[0] += how;
		lenti_info[3][2][0] += how;
	}
}
function updateBuffs() {
    var i = gls('clan');

    if (lenti_info[3][0][1]--  == 0) {
    	//reset the money info to the default
    	lenti_info[3][0][0] = lenti_clans[i].ability[0];
    	lenti_info[3][0][1] = 0;
    } else {
    	lenti_info[3][0][1]--;
    }

	if (lenti_info[3][1][1]--  == 0) {
    	//reset the protection info to the default
    	lenti_info[3][1][0] = lenti_clans[i].ability[0];
    	lenti_info[3][1][1] = 0;
    } else {
    	// lenti_info[3][1][1]--;
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
			console.log(input);
			m.textContent = input;
			break;
		default:
			console.log('working on it');
			break;
	}

	ms.appendChild(m);
	//keep the message list as far to the bottom as possible
	ms.scrollTop = ms.scrollHeight;
}















function endGame() {
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

	//update our storage and localStorage

	//transition to the next screen
	lgame_s.style.right = '-100%';
	lclan_s.style.right = 0;

	//empty the blocks
	var b = document.getElementsByClassName('b');
	for (var i = 0; i < b.length; i++) {
		b[i].parentNode.removeChild(b[i]);
	}
}