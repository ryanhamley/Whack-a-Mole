var whackamole = (function () {
  var board = document.getElementById('board');
  var openings = [];
  var options = {
    minimumMoles:  2,
    maximumMoles: 6,
    pause: 1000,
    duration: 2750
  };

  //shuffle implements the Fisher-Yates random shuffle algorithm. it shuffles the given array in place
  //this implementation is illustrated by Mike Bostock at http://bost.ocks.org/mike/shuffle/
  function shuffle (array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

  //hasClass checks a DOM element to determine if it has a specified class applied to it.
  function hasClass (element, cls) {
    //classList is a DOMTokenList so we have to use contains() to search it
    return element.classList.contains(cls);
  }

  //setupBoard creates the board for the game by adding the hole elements and the elements which will become moles, as well as the score and event listener
  function setupBoard () {
    var circle, mole;
    var score = 0;

    //16 gives us a nice 4 x 4 board
    for (var i = 0; i < 16; i++) {
      circle = document.createElement('div');
      circle.classList.add('circle');

      mole = document.createElement('div');
      //we need an array of all the moles to create random arrangements of them later
      openings.push(mole);
      circle.appendChild(mole);

      board.appendChild(circle);
    }

    //initialize the player's score to zero
    var scoreSpan = document.getElementById('score');
    scoreSpan.innerHTML = score;

    //add the event listener to the board and then use event delegation to pick out hits on the moles and increase the player's score
    board.addEventListener('click', function(e) {
      if (hasClass(e.target, 'mole')) {
        //if the target is clicked, we need to "knock it down" so that the player can't just keep clicking it and run up their score
        e.target.classList.remove('mole');
        scoreSpan.innerHTML = ++score;
      }
    });
  };

  //run creates the random moles for each round
  function run () {
    //remove the mole classes from the last round to ensure a clean slate each round
    openings.forEach(function (opening) {
      opening.classList.remove('mole');
    });

    //running the shuffle code in the set timeout allows for a pause between rounds
    setTimeout(function () {
      var shuffled = shuffle(openings);
      var random = Math.floor(Math.random() * (options.maximumMoles - options.minimumMoles +1)) + options.minimumMoles;

      //shuffle the mole elements and pick out the first n number of them to pop up the next round, where n is a random number
      for (var i = 0; i < random; i++) {
        shuffled[i].classList.add('mole');
      }
    }, options.pause);

    //recursively call run every n seconds to continually play the game
    setTimeout(run, options.duration);
  };

  function initialize () {
    setupBoard();
    run();
  }

  return {
    init: initialize
  };
})();

window.addEventListener('DOMContentLoaded', function () {
  whackamole.init();
});