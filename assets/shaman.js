var lenti_shaman = [
//money
[
	[[1, 10], 'proper investments', 100, 20],
	[[20, 30], 'under the table', 300, 40],
	[[40, 50], 'hedge funds', 600, 60],
	[[60, 70], 'what goes around comes around', 1000, 80]
],

//protection/resilience
[
	[[1, 10], 'thick skin', 100, 20],
	[[20, 30], 'reassurance', 300, 40],
	[[40, 50], 'hired protection', 600, 60],
	[[60, 70], 'divine intervention', 1000, 80]
],

//moves
[
	[[1, 10], 'wise words', 100, 20],
	[[20, 30], 'a sense of urgency', 300, 40],
	[[40, 50], 'pep in yo step', 600, 60],
	[[60, 70], '"vitamins"', 1000, 80]
]
//end of shaman info
];

function visitShaman() {
	//prepare the shaman screen
	var shaman = lenti.screens.shaman.querySelector('.shaman');
	if (shaman.style.backgroundImage == '') {
		shaman.style.backgroundImage = lenti_clans[lenti.clan].shaman;
		shaman.style.backgroundPosition = '0 0';
	}


	var wares = lenti.screens.shaman.querySelector('.buythese');
	var messages = lenti.screens.shaman.getElementsByTagName('p')[0];
	if (wares.children.length) {
		//remove these children
		for (var i = wares.children.length; i > 0; i--) {
			wares.removeChild(wares.children[i]);
		}
	}
	var sellThese = shamanSalesman();
	if (sellThese.length) {
		messages.textContent = 'Hello young Lenti. You\'re growing up nice and strong. What can I offer you today?';
		wares.innerHTML = sellThese.join(' ');

		var e = document.getElementsByClassName('inventory');
		addEvent(e, 'click', buyShamanBuff);
	} else {
		messages.textContent = 'Greetings Lenti. I hope this day brings you joy and opportunity.';
	}


	//transition to the shaman screen
	ts('clan', 'shaman');
	//get us out of here
    lenti.screens.shaman.querySelector('.backToClan').addEventListener('click', backToClan, false);
}

function shamanSalesman() {
	//what can the shaman sell us?
	var things = [];
	for (var i = 0; i < lenti_shaman.length; i++) {
		for (var j = 0; j < lenti_shaman[i].length; j++) {
			if (lenti.stats[i] > lenti_shaman[i][j][0][0] && lenti.stats[i] <= lenti_shaman[i][j][0][1]) {
				var str = '<li class="inventory" data-index="' + i + '" data-cost="' + lenti_shaman[i][j][2] + '" data-stat="' + lenti_shaman[i][j][3] + '">' + lenti_shaman[i][j][1] + '</li>';
				things.push(str);
			}
		}
	}

	return things;
}

function buyShamanBuff() {
	var confirmMessage = 'That will cost you ' + this.getAttribute('data-cost') + '. Are you sure?'; 
	if (window.confirm(confirmMessage)) {
		if (+this.getAttribute('data-cost') > lenti.money) {
			window.alert('You can\'t afford this. Try later when you\'re richer');
			return;
		} else {
			var which = +this.getAttribute('data-index');
			var cost = +this.getAttribute('data-cost');
			var value = +this.getAttribute('data-stat');
			
			//update the stat
			lenti.stats[which] = value;

			//update the money
			lenti.money -= cost;

			//localStorage
			sls('money', lenti.money)
			updateStats();

			//remove the item from available inventory
			// this.parentNode.removeChild(this);
			this.removeEventListener('click', buyShamanBuff, false);
			this.textContent = 'thanks...';
		}
	}
}