//initial variable setup
var lhome_s = document.getElementById('homeScreen'),
    lsetup_s = document.getElementById('setupScreen'),
    lclan_s = document.getElementById('clanScreen'),
    ltreasure_s = document.getElementById('treasureScreen'),
    lachieve_s = document.getElementById('achievementScreen'),
    lgame_s = document.getElementById('gameScreen'),
    lmodal_s = document.getElementById('modalScreen');

function init() {
    //is there a saved game?
    if (!(window.localStorage['lenti-game'] === '')) {
        var start = document.getElementById('startPlaying');
        start.style.display = 'block';
        start.addEventListener('click', continueGame, false);
    }

    //you can always choose a new clan
    document.getElementById('chooseClan').addEventListener('click', chooseClan, false);

    //give the container height
    document.querySelector('.container').style.height = window.innerHeight + 'px';
}

//run our init
init();









function continueGame() {
    prepareGame();
    lhome_s.style.right = '100%';
    lclan_s.style.right = '0';
}
function chooseClan() {
    //is there an existing game?
    if (!window.localStorage['lenti-game'] === ('')) {
        var make_sure = window.prompt('You already have a family. Are you sure you want to through away all your progress with your current clan? Type "YES" if you want to start ties with a new clan', 'YES');
        if (!make_sure === 'YES') {
            return;
        }
    }

    //prepare the clan page
    for (var i = 0; i < lenti_clans.length; i++) {
        var im = lsetup_s.children[1].children[i];

        im.src = lenti_clans[i].banner;
        im.addEventListener('click', showClanChoiceInfo, false);
    }

    //show the clan setup
    lhome_s.style.right = '100%';
    lsetup_s.style.right = '0';
}
function showClanChoiceInfo() {
    //which clan is active?
    var which;
    var options = lsetup_s.children[1].children;
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
    lsetup_s.children[0].textContent = lenti_clans[which].name;
    lsetup_s.children[2].textContent = lenti_clans[which].description;

    //allow person to choose this clan
    var chooseMe = lsetup_s.children[3];
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
    // window.localStorage['lenti-game'] = lenti_clans[clan].name;
    // window.localStorage['lenti-start'] = new Date();
    // window.localStorage['lenti-clan'] = clan;
    sls('game', lenti_clans[clan].name);
    sls('start', new Date());
    sls('clan', clan);
    sls('game-count', 0);
    sls('treasures', '');
    sls('achievements', '')

    //show us to the clan overview page
    prepareGame();
    lsetup_s.style.right = '100%';
    lclan_s.style.right = 0;
}
function prepareGame() {
    updateClanOverview();
    updateTreasures();
    updateAchievements();
}
function updateClanOverview() {
    var i = gls('clan');
    var elem = lclan_s.children;

    //set the title
    elem[0].textContent = 'Clan ' + lenti_clans[i].name;

    //set the image
    elem[1].children[0].src = lenti_clans[i].banner;

    //prepare our actions
    document.getElementById('playGame').addEventListener('click', playGame, false);
    document.getElementById('treasureList').addEventListener('click', showTreasures, false);
    document.getElementById('achievementList').addEventListener('click', showAchievements, false);

    //start our scrolling message board
    //m = window.setInterval(messageBoard, 2000);
}
function updateTreasures() {
    //get us out of here
    ltreasure_s.querySelector('.backToClan').addEventListener('click', backToClan, false);
}
function updateAchievements() {
    //get us out of here
    lachieve_s.querySelector('.backToClan').addEventListener('click', backToClan, false);
}
function backToClan() {
    //where are we returning from?
    var from = document.getElementById(this.parentNode.parentNode.id);

    from.style.right = '-100%';
    lclan_s.style.right = 0;
}
function showTreasures() {
    console.log('almost, greedy pig');
    updateTreasures();

    lclan_s.style.right = '100%';
    ltreasure_s.style.right = '0';
}
function showAchievements() {
    console.log('almost, you spurring wildhorse');
    updateAchievements();

    lclan_s.style.right = '100%';
    lachieve_s.style.right = '0';
}









function playGame() {
    console.log('almost, my pet');
}

