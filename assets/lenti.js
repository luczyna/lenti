//initial variable setup
var lenti = {
    'screens': {
        home: document.getElementById('homeScreen'),
        setup: document.getElementById('setupScreen'),
        clan: document.getElementById('clanScreen'),
        treasure: document.getElementById('treasureScreen'),
        achievements: document.getElementById('achievementScreen'),
        game:  document.getElementById('gameScreen'),
        modal: document.getElementById('modalScreen')
    },
    'stats': [0, 0, 0],
    'clan': 0,
    'rounds': 0,
    'money': 0,
    'lenti': document.getElementById('lenti')
}

//overview of local Storage
//window.localStorage['lenti-_____']
//game = 'yes' there is a game
//start = new Date() when clan is chosen
//stats = '0 0 0' stats of the lenti
//rounds = 0 how many rounds have been played
//clan = 0 which clan are you playing (0-2)
//money = 0 the stores of money
//treasures = '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0'
//             what do we have? | how many do we have?
//ach-money = '0 0 0 0'
//ach-resilience = '0 0 0 0'
//ach-moves = '0 0 0 0'
//ach-rounds = '0 0 0 0'

function init() {
    //is there a saved game?
    if ( window.localStorage['lenti-game'] !== ('' || 'undefined') ) {
        var start = document.getElementById('startPlaying');
        start.style.display = 'block';
        start.addEventListener('click', continueGame, false);
    }

    //you can always choose a new clan
    document.getElementById('chooseClan').addEventListener('click', chooseClan, false);

    //give the container height
    document.querySelector('.container').style.height = window.innerHeight + 'px';
    document.querySelector('.container').style.width = window.innerWidth + 'px';
}

//run our init
init();









function continueGame() {
    prepareGame();
    // lenti.screens.home.style.right = '100%';
    // lenti.screens.clan.style.right = '0';
    // transitionScreen('home', 'clan');
    ts('home', 'clan');
}









function chooseClan() {
    //is there an existing game?
    if (window.localStorage['lenti-game'] !== '') {
        var make_sure = window.confirm('You already have a family. Are you sure you want to through away all your progress with your current clan?');
        if (!make_sure) {
            return;
        }
    }

    //prepare the clan page
    for (var i = 0; i < lenti_clans.length; i++) {
        var im = lenti.screens.setup.children[1].children[i];

        im.src = lenti_clans[i].banner;
        im.addEventListener('click', showClanChoiceInfo, false);
    }

    //show the clan setup
    // lenti.screens.home.style.right = '100%';
    // lenti.screens.setup.style.right = '0';
    // transitionScreen('home', 'setup');
    ts('home', 'setup');
}
function showClanChoiceInfo() {
    //which clan is active?
    var which;
    var options = lenti.screens.setup.children[1].children;
    for (var i = 0; i < options.length; i++) {
        if (this === options[i]) {
            which = i;
            break;
        }
    }

    //annotate the active clan
    removeClass(options, 'active');
    options[which].classList.add('active');

    //show description and name of clan
    lenti.screens.setup.children[0].textContent = lenti_clans[which].name;
    lenti.screens.setup.children[2].textContent = lenti_clans[which].description;

    //allow person to choose this clan
    var chooseMe = lenti.screens.setup.children[3];
    if (chooseMe.getAttribute('data-clan') === '') {
        chooseMe.style.opacity = 1;
        chooseMe.setAttribute('data-clan', which)        
        chooseMe.addEventListener('click', makeClanChoice, false);
    } else {
        chooseMe.setAttribute('data-clan', which)        
    }
}
function makeClanChoice() {
    //take away their button!
    this.style.opacity = 0;

    //which clan is chosen?
    var clan = +this.getAttribute('data-clan');

    //set this up in the localStorage
    sls('game', lenti_clans[clan].name);
    sls('start', new Date());
    var stats = lenti_clans[clan].ability[0] + ' ' + lenti_clans[clan].ability[1] + ' ' + lenti_clans[clan].ability[2];
    sls('stats', stats);
    sls('rounds', 0);
    sls('clan', clan);
    sls('money', 0);
    sls('treasures', '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0');
    sls('ach-money', '0 0 0 0');
    sls('ach-resilience', '0 0 0 0');
    sls('ach-moves', '0 0 0 0');
    sls('ach-rounds', '0 0 0 0');

    //show us to the clan overview page
    prepareGame();
    // lenti.screens.setup.style.right = '100%';
    // lenti.screens.clan.style.right = 0;
    // transitionScreen('setup', 'clan');
    ts('setup', 'clan');
}









function prepareGame() {
    updateGlobalVariables();
    updateClanOverview();
    updateTreasures();
    updateAchievements();
}

function updateClanOverview() {
    var i = lenti.clan;
    var elem = lenti.screens.clan.children;

    //set the title
    elem[0].textContent = 'Clan ' + lenti_clans[i].name;

    //set the image
    elem[1].children[0].src = lenti_clans[i].banner;

    //prepare our actions
    document.getElementById('playGame').addEventListener('click', playGame, false);
    document.getElementById('treasureList').addEventListener('click', showTreasures, false);
    document.getElementById('achievementList').addEventListener('click', showAchievements, false);
    document.getElementById('seeShaman').addEventListener('click', visitShaman, false);

    //start our scrolling message board
    //m = window.setInterval(messageBoard, 2000);
}








function updateGlobalVariables() {
    lenti.clan = Number(gls('clan'));
    lenti.rounds = Number(gls('rounds'));
    lenti.money = Number(gls('money'));

    var s = gls('stats');
    var st = s.split(' ');
    for (var i = 0; i < st.length; i++) {
        lenti.stats[i] = +st[i];
    }

    var t = gls('treasures');
    var tr = t.split(' ');
    var ta = tr.slice(0, 9);
    var tc = t.slice(9);
    for (var j = 0; j < ta.length; j++) {
        lenti_aquired.treasure[j] = +ta[j];
        lenti_aquired.treasure_count[j] = +tc[j];
    }

    var amon = (gls('ach-money')).split(' '),
        ares = (gls('ach-resilience')).split(' '),
        amov = (gls('ach-moves')).split(' '),
        arnd = (gls('ach-rounds')).split(' ');
    for (var k = 0; k < amon.length; k++) {
        lenti_aquired.achievements[0][k] = +amon[k];
        lenti_aquired.achievements[1][k] = +ares[k];
        lenti_aquired.achievements[2][k] = +amov[k];
        lenti_aquired.achievements[3][k] = +arnd[k];
    }
}


function backToClan() {
    //where are we returning from?
    var from = document.getElementById(this.parentNode.parentNode.id);

    if (from == 'treasureScreen') {
        ts('treasure', 'clan');
    } else if (from == 'achievementScreen') {
        ts('achievements', 'clan');
    }
}

function showAboutGame() {
    console.log('I can\'t answer you yet');
}

