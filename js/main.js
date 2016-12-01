/** HOLE CLASS DEFINITION **/
function Hole (el) {
  this.element = el;
}

Hole.prototype.init = function init () {
  this.element.classList.add('hole');
};

Hole.prototype.addMole = function addMole (mole) {
  this.element.appendChild(mole.element);
};

/** MOLE CLASS DEFINITION **/
function Mole (el) {
  this.element = el;
}

Mole.prototype.init = function init (i) {
  this.element.id = ['mole', i].join('-');
};

Mole.prototype.popup = function popup () {
  this.element.classList.add('mole');
};

Mole.prototype.knockdown = function knockdown () {
  this.element.classList.remove('mole');
};

Mole.prototype.canBeKnockedDown = function canBeKnockedDown () {
  // classList is a DOMTokenList so we have to use contains() to search it
  return this.element.classList.contains('mole');
};

/** BOARD CLASS DEFINITION **/
function Board (el, options) {
  var _options = {
    minimumMoles:  2,
    maximumMoles: 6,
    pause: 1000,
    duration: 2750
  };

  this.element = el;
  this.moles = [];
  this.options = options || _options;
  this.score = 0;
  this.scoreSpan = document.getElementById('score');
}

Board.prototype.addHole = function addHole (hole) {
  this.element.appendChild(hole.element);
};

Board.prototype.addMole = function addMole (mole) {
  this.moles.push(mole);
};

Board.prototype.clear = function clear () {
  this.moles.forEach(function (mole) {
    mole.element.classList.remove('mole');
  });
};

Board.prototype.init = function init () {
  this.scoreSpan.innerHTML = this.score;
};

Board.prototype.incrementScore = function incrementScore () {
  this.scoreSpan.innerHTML = ++this.score;
};

Board.prototype.onClick = function onClick (cb) {
  this.element.addEventListener('click', cb);
};

Board.prototype.createDiv = function createDiv () {
  return document.createElement('div');
};

Board.prototype.getRandomNumber = function getRandomNumber () {
  return Math.floor(Math.random() * (this.options.maximumMoles - this.options.minimumMoles +1)) + this.options.minimumMoles;
};

Board.prototype.getMole = function getMole (id) {
  return this.moles.filter(function (mole) {
    return mole.element.id === id;
  })[0];
};

Board.prototype.shuffle = function shuffle () {
  // shuffle implements the Fisher-Yates random shuffle algorithm. it shuffles the given array in place
  // this implementation is illustrated by Mike Bostock at http:// bost.ocks.org/mike/shuffle/
  var m = this.moles.length, t, i;

  //  While there remain elements to shuffle…
  while (m) {
    //  Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    //  And swap it with the current element.
    t = this.moles[m];
    this.moles[m] = this.moles[i];
    this.moles[i] = t;
  }

  return this.moles;
};

var whackamole = (function () {
  var boardElement = document.getElementById('board');
  var board = new Board(boardElement);

  // setupBoard creates the board for the game by adding the hole elements and the elements which will become moles, as well as the score and event listener
  function setupBoard () {
    var hole, mole;

    // 16 gives us a nice 4 x 4 board
    for (var i = 0; i < 16; i++) {
      hole = new Hole(board.createDiv());
      hole.init();

      mole = new Mole(board.createDiv());
      mole.init(i);

      // we need an array of all the moles to create random arrangements of them later
      board.addMole(mole);
      hole.addMole(mole);
      board.addHole(hole);
    }

    // initialize the player's score to zero
    board.init();

    // add the event listener to the board and then use event delegation to pick out hits on the moles and increase the player's score
    board.onClick(function (e) {
      var mole = board.getMole(e.target.id);

      if (mole && mole.canBeKnockedDown()) {
        // if the target is clicked, we need to "knock it down" so that the player can't just keep clicking it and run up their score
        mole.knockdown();
        board.incrementScore();
      }
    });
  }

  // run creates the random moles for each round
  function run () {
    // remove the mole classes from the last round to ensure a clean slate each round
    board.clear();

    // running the shuffle code in the set timeout allows for a pause between rounds
    setTimeout(function () {
      var shuffledMoles = board.shuffle();
      var n = board.getRandomNumber();

      // shuffle the mole elements and pick out the first n number of them to pop up the next round, where n is a random number
      for (var i = 0; i < n; i++) {
        shuffledMoles[i].popup();
      }
    }, board.options.pause);

    // recursively call run every n seconds to continually play the game
    setTimeout(run, board.options.duration);
  }

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
