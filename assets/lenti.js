//initial variable setup
var clan = [],
    lenti,
    enemy = [],
    rounds =[];

/*  this is here for TESTING 
    remove it to test the true functionality
*/

clan['name'] = 'sasuke';
clan['total points'] = 0;
clan['lenti population'] = 10;
clan['lenti graveyard'] = 0;
clan['achievements'] = [];
clan['amenities'] = [];
clan['total rounds'] = 0;


$(document).ready(function() {
    console.log(clan);
    //load the game page
    $('#start').click(function() {
        $('#wrapper').load('game.php', gameInit);
    });

});


//game functions
//start the game
function gameInit() {
    //check if we have a clan started
    if (!(clan['name'])) {
        clan['name'] = prompt('Name your Lenti Clan');
        clanInit();
    }

    //set the (c)urrent game 
    var c = clan['total rounds'];
    roundInit(c);

    //set up information in game
    gameHeaderUpdate(c);
}

//populate the Clan Array will all good information
function clanInit() {
    clan['total points'] = 0;
    clan['lenti population'] = 10;
    clan['lenti graveyard'] = 0;
    clan['achievements'] = [];
    clan['amenities'] = [];
    clan['total rounds'] = 0;
}

//populate the Round Array will all good information
function roundInit(currentGame) {
    rounds[currentGame] = [];
    rounds[currentGame]['shots'] = 100;
    rounds[currentGame]['points'] = 0;
    rounds[currentGame]['time start'] = new Date();
    rounds[currentGame]['hits'] = 0;
    rounds[currentGame]['blows'] = 0;
    rounds[currentGame]['collections'] = 0;
}

//update the visible game score and shots
function gameHeaderUpdate(currentGame) {
    var gameHead = $('.game-header');
    gameHead.find('.score').text(rounds[currentGame]['points']);
    gameHead.find('.shots').text(rounds[currentGame]['shots']);
}