//easier to harder
lenti_monster_chance = [ [0, 0.6], [0.6, 0.8], [0.8, 0.95], [0.95, 1] ];

lenti_monsters = [
{
	'name': 'Blabberjowel',
	'message': 'It ferrociously bites at you with it\'s nasty, floppy chops. Spit is everywhere. Oh, the horror?',
	'action': [ ['moves', 'base', 5] ]
},

{
	'name': 'Rafmenfer',
	'message': 'Before battering you with it\'s numerous limbs, it slurps in the air as if it was drinking in the delicious broth of the fear and sweat you were exuding.',
	'action': [ ['moves', 'multiplier', 0.5] ]
},

{
	'name': 'Squibble',
	'message': 'You thought this thing was cute? WTF is WWY, SMH. It ate half your leg.',
	'action': [ ['moves', 'multiplier', 0.75], ['money', 'multiplier', 0.5] ]
},

{
	'name': 'Howling Fjordie',
	'message': 'The skies blackened as the tremendous, 15lb. beast rears up and let\'s loose a sound so maddening, so deafing, so bone-chilling that you might as well just die on the spot. "Woof."',
	'action': [ ['moves', 'multiplier', 0, 'special'] ]
}

//end lenti monster list 
];









function foundMonster() {
	console.log('a monster attacks you');

	//what monster is it?
	var which = checkChances(lenti_monster_chance);
	var monster = lenti_monsters[which];
	// console.log(monster.name);


	//how much damage do we take? incorporate buffs...
	var damages = monster.action;
	for (var i = 0; i < damages.length; i++) {
		var kind = damages[i][0];
		var reduction = damages[i][1];
		var value = damages[i][2];

		if (kind == 'moves') {
			var statReduction = 1 - (Math.floor((lenti.stats[1] + lentiGame.buffs[1][0]) / 10) * 0.1);
			if (reduction == 'base') {
				lentiGame.time -= Math.ceil(value * statReduction);
			} else if (reduction == 'multiplier') {
				lentiGame.time *= (value * statReduction);
			}

			//how much time do we have total?
			var t = lentiGame.moves;
			//how much time do we have left?
			var l = lentiGame.time;

			//change the style of the timer to reflect this
			document.getElementById('timer').style.right = (100 - (100 * (l / t))) + '%';
		} else if (kind == 'money') {
			lentiGame.money = Math.floor(lentiGame.money * value);
			lenti.screens.game.querySelector('.money').textContent = lentiGame.money;
		}
	}

	lentiGame.monsters++;

	writePopup('monster', monster);
	updateProtectionBuff();

	// console.log('the monster attach should be done now');
}
