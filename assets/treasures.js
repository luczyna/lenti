lenti_treasures = [
{
	'name': 'Book of Checks',
	'message': 'Your financial organization has never been better. Thank god you can track all this mundane information.',
	'action': ['money', 5],
	'picture': 'assets/images/treasures/checks.png'
},

{
	'name': 'Printing Press',
	'message': 'Why work hard for money when you could make your own money, on your own time?',
	'action': ['money', 5],
	'picture': 'assets/images/treasures/press.png'
},

{
	'name': 'Credit Card',
	'message': 'This small, flat piece of plastic has been the downfall of countless fools. Use with caution.',
	'action': ['money', 5],
	'picture': 'assets/images/treasures/creditcard.png'
},

{
	'name': 'Fleeting Feet',
	'message': 'These shoes tickle your toes a little, but damn do you move quick',
	'action': ['moves', 5],
	'picture': 'assets/images/treasures/fleetfeet.png'
},

{
	'name': 'Crack Cocaine',
	'message': 'Don\'t do drugs kids. Unless you want your teeth to fall out, and to gain the hyper-attentive energy of the universe.',
	'action': ['moves', 5],
	'picture': 'assets/images/treasures/drugs.png'
},

{
	'name': 'Crushed Hummingbird',
	'message': 'Just a pinch of this sends you into a flurry, and your rapidly beating heart might be really about it... or it just might be giving out.',
	'action': ['moves', 5],
	'picture': 'assets/images/treasures/hummingbird.png'
},

{
	'name': 'Protien Protien',
	'message': 'Better get your protien on for some gains, bruh.',
	'action': ['protect', 5],
	'picture': 'assets/images/treasures/protien.png'
},

{
	'name': 'Kevlar Underwear',
	'message': 'The layers will protect that which is dearest to you or your shallow loved ones.',
	'action': ['protect', 5],
	'picture': 'assets/images/treasures/underwear.png'
},

{
	'name': 'Mother\'s Love',
	'message': 'While others may laugh, they will never understand the warmth and strength of a woman.',
	'action': ['protect', 5],
	'picture': 'assets/images/treasures/lovemom.png'
}
];

lenti_achievements = [
	//money
	[
		['Shiny Objects', 10],
		['For the Hoard', 30],
		['Rolling in the Gold', 100],
		['Loot Monster', 200]
	],
	//resilience
	[
		['Walk it off', 2],
		['It does\'t hurt that much', 6],
		['Battle Hardened', 10],
		['They must be attracted to you', 20]
	],
	//moves
	[
		['love long tim', 60],
		['are we there yet', 90],
		['This is the song that never ends!', 120],
		['Yes it goes on and on, my friend', 180]
	],
	//rounds
	[
		['Getting your feet wet', 10],
		['It\'s like you\'ve always been here', 20],
		['It is not a problem, I can stop any time', 50],
		['Addicted', 100]
	]
];

lenti_aquired = {
	treasure: [0, 0, 0, 0, 0, 0, 0, 0, 0],
	treasure_count: [0, 0, 0, 0, 0, 0, 0, 0, 0],
	achievements: [ [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0] ]
}

var endGameTreasures = [];


















//check treasures
function checkInitTreasures() {
	var ls = window.localStorage['lenti-treasures'];
	var tTotal = ls.split(' ');
	var t = tTotal.slice(0, 9)
	var tc = tTotal.slice(9);

	//these are still strings
	for (var i = 0; i < lenti_aquired.treasure.length; i++) {
		lenti_aquired.treasure[i] = +t[i];
	}
	// lenti_aquired.treasure = t;

	for (var i = 0; i < lenti_aquired.treasure_count.length; i++) {
		lenti_aquired.treasure_count[i] = +tc[i];
	}
	// lenti_aquired.treasure_count = tc;
}

function foundTreasure() {
	//which one?
	var i = Math.floor(Math.random() * 9);

	//tell player they got a new treasure
	console.log(lenti_treasures[i].name);

	//animate the lenti to the excited max
	//lentiGame.lentiPosition[2] = 0;
	//lentiGame.lentiPosition[1] = 2;

	//update our info
	lenti_aquired.treasure[i] = 1;
	lenti_aquired.treasure_count[i]++;

	//for the end of the game, you'll get the stat improvements
	endGameTreasures.push(i);

	writePopup('treasure', null);
}

function updateTreasureLocalStorage() {
	window.localStorage['lenti-treasures'] = lenti_aquired.treasure[0] + ' ' + lenti_aquired.treasure[1] + ' ' + lenti_aquired.treasure[2] + ' ' + lenti_aquired.treasure[3] + ' ' + lenti_aquired.treasure[4] + ' ' + lenti_aquired.treasure[5] + ' ' + lenti_aquired.treasure[6] + ' ' + lenti_aquired.treasure[7] + ' ' + lenti_aquired.treasure[8] + ' ' + lenti_aquired.treasure_count[0] + ' ' + lenti_aquired.treasure_count[1] + ' ' + lenti_aquired.treasure_count[2] + ' ' + lenti_aquired.treasure_count[3] + ' ' + lenti_aquired.treasure_count[4] + ' ' + lenti_aquired.treasure_count[5] + ' ' + lenti_aquired.treasure_count[6] + ' ' + lenti_aquired.treasure_count[7] + ' ' + lenti_aquired.treasure_count[8];
	console.log('treasure localStorage updated');
}

function updateTreasures() {
	//what treasures do we have?
	//how many of what do we have?
	//annotate that in our treasure list
	var elem = lenti.screens.treasure.children[2].children;

	for (var i = 0; i < elem.length; i++) {
		if (lenti_aquired.treasure[i]) {
			//image
			elem[i].children[0].src = lenti_treasures[i].picture;

			//info
			elem[i].children[1].children[0].textContent = lenti_treasures[i].name;
			elem[i].children[1].children[1].textContent = lenti_treasures[i].message;
			
			//count
			elem[i].children[2].textContent = lenti_aquired.treasure_count[i];

			//show the info
			elem[i].children[1].classList.remove('unknown')
			elem[i].children[2].classList.remove('unknown')
		}
	}

}

function showTreasures() {
    console.log('almost, greedy pig');
    updateTreasures();

    // lenti.screens.clan.style.right = '100%';
    // lenti.screens.treasure.style.right = '0';
    ts('clan', 'treasure');
    
    
    //get us out of here
    lenti.screens.treasure.querySelector('.backToClan').addEventListener('click', backToClan, false);
}






//check achievements
function checkInitAch() {
	var type = ['money', 'resilience', 'moves', 'rounds'];
	var conversion = [];

	for (var i = 0; i < type.length; i++) {
		var s = 'lenti-ach-' + type[i];
		var ls = window.localStorage[s];
		var info = ls.split(' ');

		conversion[i] = [];
		for (var j = 0; j < info.length; j++) {
			conversion[i][j] = +info[j];
		}
	}
	return conversion;
}

function assignInitAchievements() {
	info = checkInitAch();
	for (var i = 0; i < info.length; i++) {
		lenti_aquired.achievements[i] = info[i];
	}
}

function checkForAchievement() {
	var acheived = [];
	var check = [lentiGame.money, lentiGame.monsters, lentiGame.moves, lenti.rounds]
	
	//check achievements
	for (var i = 0; i < lenti_achievements.length; i++) {

		//check the individual achievements
		for (var j = 0; j < lenti_achievements[i].length; j++) {
			//has it been achieved already?
			if ( !(lenti_aquired.achievements[i][j]) ) {
				//did you achieve it
				if ( check[i] > lenti_achievements[i][j][1]) {
					//now you have achieved it
					achieved.push(lenti_achievements[i][j][0]);

					//better tell our variable that
					lenti_aquired.achievements[i][j] = 1;
				}
			}
			
		}
	}

	//update localStorage
	window.localStorage['lenti-ach-money'] = lenti_aquired.achievements[0][0] + ' ' + lenti_aquired.achievements[0][1] + ' ' + lenti_aquired.achievements[0][2] + ' ' + lenti_aquired.achievements[0][3];
	window.localStorage['lenti-ach-resilience'] = lenti_aquired.achievements[1][0] + ' ' + lenti_aquired.achievements[1][1] + ' ' + lenti_aquired.achievements[1][2] + ' ' + lenti_aquired.achievements[1][3];
	window.localStorage['lenti-ach-moves'] = lenti_aquired.achievements[2][0] + ' ' + lenti_aquired.achievements[2][1] + ' ' + lenti_aquired.achievements[2][2] + ' ' + lenti_aquired.achievements[2][3];
	window.localStorage['lenti-ach-rounds'] = lenti_aquired.achievements[3][0] + ' ' + lenti_aquired.achievements[3][1] + ' ' + lenti_aquired.achievements[3][2] + ' ' + lenti_aquired.achievements[3][3]; 

	//end it all
	return achieved;
}







function updateAchievements() {
	//what achievements do we have?
	var list = lenti.screens.achievements.getElementsByClassName('ach');
	//check the achievement groupings
	for (var i = 0; i < list.length; i++) {
		//now check the individual achievements
		var ach = list[i].children;
		for (var j = 0; j < ach.length; j++) {
			//was it achieved and does it need updating?
			if (lenti_aquired.achievements[i][j] === 1 && ach[j].classList.contains('notyet')) {
					//update the name'
					ach[j].children[0].textContent = lenti_achievements[i][j][0];
					ach[j].classList.remove('notyet');

			} else {
				//this needs to be run at least once
				//to show how many you need to get achievement
				ach[j].children[1].textContent = lenti_achievements[i][j][1];
			}
		}
	}

    //get us out of here
    lenti.screens.achievements.querySelector('.backToClan').addEventListener('click', backToClan, false);
}

function showAchievements() {
    console.log('almost, you spurring wildhorse');
    updateAchievements();

    // lenti.screens.clan.style.right = '100%';
    // lenti.screens.achievements.style.right = '0';
    ts('clan', 'achievements');
}