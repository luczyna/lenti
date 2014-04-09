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
    //initial set up of everything
    everythingInit();

    //load the game page
    $('#start').click(function() {
        $('#wrapper').load('game.php', gameInit);
    });

});


function everythingInit() {
    //set up the height of the game (minus the padding?!?)
    $('#wrapper').height($(window).height() - 32);

    if (!clan['name']) {
        $('#clan').hide();
    }
}

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

    //pause for a bit, then start the action
    var pause;
    pause = window.setTimeout(gameOpen, 500);
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

//get the game running
function gameOpen() {
    var lenti = $('.lenti');
    lenti.css('background', 'red');

    //(c)urrent game
    var c = clan['total rounds'];

    $(document).keydown(function(e) {
        if (e.keyCode == 32) {
            // console.log('the space bar is pressed');
            lenti.shoot(c);
            rounds[c]['shots']--;
            gameHeaderUpdate(c);
            // console.log(rounds);
        } else if (e.keyCode == 87) {
            // console.log('what the fuck is this');
            lenti.shrink();
        }
    });
}


















//Lenti Performances
(function($){
   $.fn.shoot = function(currentGame) {
        console.log('it will be shot');

        //create a shooting projectile
        var currentShot = rounds[currentGame]['shots'];

        if (currentShot = 0) {
            return this;
        }
        var projectile = '<div class="lenti-projectile" id="proj-' + currentShot + '"></div>';
        this.after(projectile);

        //prepare the projectile and then move it
        prepareProjectile(currentShot);
        moveProjectile(currentShot);

        //end the function
        return this;
   };

   $.fn.shrink = function() {
    console.log('they will be shrunk');
    this.width((this.width() / 2));
    return this;
   };

})( jQuery );

function prepareProjectile(currentShot) {
    var name  = '#proj-' + currentShot;
    var p     = $(name);
    var lenti = $('.lenti');

    //find out where to place the projectile
        //what is the dimension of Lenti?
    var lentiHeight = lenti.height(),
        lentiWidth  = lenti.width(),
        //where is Lenti right now?
        lentiX      = lenti.offset().left,
        lentiY      = lenti.offset().top;

    p.css({ bottom: lentiHeight, left: lentiWidth + p.width()});
}

function moveProjectile(currentShot) {
    var name  = '#proj-' + currentShot;
    var p     = $(name);
    var lenti = $('.lenti');

    //where is the projectile?
    var leftPos    = p.css('left'),
        bottomPos  = p.css('bottom');

    console.log(leftPos + ', ' + bottomPos);

    p.css({left: parseInt(leftPos, 10) + 80, bottom: 16});
}
