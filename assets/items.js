lenti_item_chance = [ [0, 0.5], [0.5, 0.7], [0.7, 0.95], [0.95, 1] ];
lenti_items = [
//teir 4 items, most common
[
	{
		'name': 'Wand of Sparks',
		'message':'You can increase the money you find for your next 5 moves. Zap!',
		'action': ['money', 10, 5]
	},
	{
		'name': 'Wooden Shield',
		'message': 'This will protect you from the next 3 monster attacks, and then splinter into a pile of tinder afterwards.',
		'action': ['protect', 20, 3]
	},
	{
		'name': 'Powdered Milk',
		'message': 'Add a little water, and you feel a little more energetic after drinking it down. Meow.',
		'action': ['moves', 5]
	}
],

//teir 3 items
[
	{
		'name': 'Wand of Lightning',
		'message':'You can blast your chances for some good money by 50% for your next 3 moves. Don\'t play with this at home, kids.',
		'action': ['money', 30, 3]
	},
	{
		'name': 'Cheese Shield',
		'message': 'Rather than eating you, the next monster that attacks you will proably stop at the shield and eat that instead.',
		'action': ['protect', 50, 1]
	},
	{
		'name': 'Fitzy Cane Juice',
		'message': 'There is so much sugar in this drink, that you can\'t help but squirm and tick.',
		'action': ['moves', 10]
	}
],

//tier 2 items
[
	{
		'name': 'Banker\'s Wand',
		'message': 'Knowledge on how to cheat the system coarses through your viens, and you know you can fluff your accounts and retirement funds easily.',
		'action': ['money', 50, 2]
	},
	{
		'name': 'Titanium Shield',
		'message': 'Light as your knowledge on foriegn investment, this reflects monster attacks as well as it reflects your handsome face back at you.',
		'action': ['protect', 40, 6]
	},
	{
		'name': 'Cranky Moves Beer, the King of Yeast',
		'message': 'Try as you might to drink in moderation, this seems to want to go down your throat with a mind of its own. But you\'re super alert and strong now... Right?',
		'action': ['moves', 15]
	}
],

//tier 1 items, most prized and fantastic
[
	{
		'name': 'Alchemic Wand',
		'message': 'Now you can alter the very composition of your aquisition, and double it with no consequences whatsoever. Except for that dark mark on your soul, but WHO CARES!?',
		'action': ['money', 75, 3]
	},
	{
		// 'name': 'Engelsflügel',
		'name': "Engelsflugel",
		'message': 'You are blessed with the protection of the divine, and the wunderbar scent of baby powder',
		'action': ['protect', 100, 3]
	},
	{
		'name': 'Golden Chalice Purple Drank',
		'message': 'Wow, with the powerful probiotic and societal cultures at work here, you just can\'t and won\'t stop.',
		'action': ['moves', 30]
	}
]

//end the item list
];

function foundItem() {
	console.log('you found an item');

	//what are we going to get?
	var tier = checkChances(lenti_item_chance);
	var which = Math.floor(Math.random() * 3);
	var item = lenti_items[tier][which];

	console.log('you found a \b' + item.name);

	//now what happens?
	itemBuffs(item.action);
	writePopup('item', item);
}

function itemBuffs(itemInfo) {
	var what = itemInfo[0];
	var how = itemInfo[1];
	// money and protection have a duration element
	// var duration = itemInfo[2]

	if (what == 'money') {
		//update your money buff
		lentiGame.buffs[0][0] += how;
		lentiGame.buffs[0][1] += itemInfo[2];
	} else if (what == 'protect') {
		//update your protection
		lentiGame.buffs[1][0] += how;
		lentiGame.buffs[1][1] += itemInfo[2];
	} else if (what == 'moves') {
		//update your moves
		lentiGame.buffs += how;

		if (lentiGame.time + how > lentiGame.moves) {
			lentiGame.moves = lenti.time + how;
		}
		lentiGame.time += how;

		lenti_info[0] += how;
		lenti_info[3][2][0] += how;
	}
}

function updateMoneyBuff() {
	//if the duration of the buff reaches 0,
	//then the buff is over, and is reduced to 0, as well
	if (lentiGame.buffs[0][1] == 0) {
		lentiGame.buffs[0][0] = 0;
	} else {
		lentiGame.buffs[0][1]--;
	}
}

function updateProtectionBuff() {
	//if the duration of the buff reaches 0,
	//then the buff is over, and is reduced to 0, as well
	if (lentiGame.buffs[1][1] == 0) {
		lentiGame.buffs[1][0] = 0;
	} else {
		lentiGame.buffs[1][1]--;
	}
}









//additionally, include a list of messages
//for when nothing happens in the game.
//we don't want it to get boring here, do we?
var nothing_messages = [
	"Nothing here.",
	"A whole lot of nothing.",
	"Wonderful! Nothing...",
	"Nope.",
	"Nada.",
	"I wonder what my mother would be thinking right now, as I find NOTHING.",
	"Squat.",
	"Here lies nothing.",
	"I've found it! Nothing! Yay!",
	"This is great, a pile of nothing.",
	"The clan will have my hide, if I return with Nothing.",
	"Nil.",
	"How many ways can you say NOTHING?",
	"How dissapointing.",
	"You can have it, I don't want this Nothing.",
	"Nothing: an absence of thing."
] 