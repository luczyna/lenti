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

	writePopup('monster', monster);

	// //how much damage do we take? incorporate buffs...
	// console.log('life at: ' + lenti_info[0]);
	// var damage = monster.action[2];
	// console.log(damage);
	// var realDamage;
	// switch (monster.action[0]) {
	// 	case 'moves':
	// 		if (monster.action[1] == 'base') {
	// 			realDamage = Math.ceil(damage * lenti_info[3][1][0]);
	// 			lenti_info[0] -= realDamage;
	// 		} else if (monster.action[1] == 'multiplier') {
	// 			realDamage = damage * lenti_info[3][1][0];
	// 			lenti_info[0] *= realDamage;
	// 			lenti_info[0] = Math.floor(lenti_info[0]);
	// 		}
	// 		document.getElementById('movesLeft').textContent = lenti_info[0];
	// 		console.log(realDamage);

	// 		break;

	// 	default:
	// 	console.log('check your foundMonster');
	// }

	// //animate the monster and the lenti

	// //write a message about it
	// writeGameMessage('monster', monster);

	// //reduce any buffs applicable
	// if (!(lenti_info[3][1][0] === 0)) {
	// 	lenti_info[3][1][0]--;
	// }
	
	// if (lenti_info[0] <= 0) {
	// 	endGame('you were killed in action');
	// }
}
