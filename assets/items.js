lenti_item_chance = [ [0, 0.5], [0.5, 0.7], [0.7, 0.95], [0.95, 1] ];
lenti_items = [
//teir 4 items, most common
[
	{
		'name': 'Wand of Sparks',
		'message':'You can increase the money you find by 25% in you next 5 moves. Zap!',
		'action': ['money', 1.25, 5]
	},
	{
		'name': 'Wooden Shield',
		'message': 'This will protect you from the next 3 monster attacks, and then splinter into a pile of tinder afterwards.',
		'action': ['protect', 0.75, 3]
	},
	{
		'name': 'Powdered Milk',
		'message': 'Add a little water, and you feel a little more energetic after drinking it down. Meow.',
		'action': ['moves', 10]
	}
],

//teir 3 items
[
	{
		'name': 'Wand of Lightning',
		'message':'You can blast your chances for some good money by 50% for your next 3 moves. Don\'t play with this at home, kids.',
		'action': ['money', 1.5, 3]
	},
	{
		'name': 'Cheese Shield',
		'message': 'Rather than eating you, the next monster that attacks you will proably stop at the shield and eat that instead.',
		'action': ['protect', 0.25, 1]
	},
	{
		'name': 'Fitzy Cane Juice',
		'message': 'There is so much sugar in this drink, that you can\'t help but squirm and tick.',
		'action': ['moves', 20]
	}
],

//tier 2 items
[
	{
		'name': 'Banker\'s Wand',
		'message': 'Knowledge on how to cheat the system coarses through your viens, and you know you can fluff your accounts and retirement funds easily.',
		'action': ['money', 1.75, 2]
	},
	{
		'name': 'Titanium Shield',
		'message': 'Light as your knowledge on foriegn investment, this reflects monster attacks as well as it reflects your handsome face back at you.',
		'action': ['protect', 0.5, 6]
	},
	{
		'name': 'Cranky Moves Beer, the King of Yeast',
		'message': 'Try as you might to drink in moderation, this seems to want to go down your throat with a mind of its own. But you\'re super alert and strong now... Right?',
		'action': ['moves', 30]
	}
],

//tier 1 items, most prized and fantastic
[
	{
		'name': 'Alchemic Wand',
		'message': 'Now you can alter the very composition of your aquisition, and double it with no consequences whatsoever. Except for that dark mark on your soul, but WHO CARES!?',
		'action': ['money', 2, 3]
	},
	{
		'name': 'Engelsflügel',
		'message': 'You are blessed with the protection of the divine, and the wunderbar scent of baby powder',
		'action': ['protect', 1, 3]
	},
	{
		'name': 'Golden Chalice Purple Drank',
		'message': 'Wow, with the powerful probiotic and societal cultures at work here, you just can\'t and won\'t stop.',
		'action': ['moves', 10]
	}
]

//end the item list
];









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
	"Here lies nothing",
	"I've found it! Nothing! Yay!",
	"This is great, a pile of nothing.",
	"The clan will have my hide, if I return with Nothing.",
	"Nil.",
	"How many ways can you say NOTHING?",
	"How dissapointing.",
	"You can have it, I don't want this Nothing.",
	"Nothing: an absence of thing."
] 