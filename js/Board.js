/** BOARD CLASS DEFINITION **/
function Board (el, options) {
  var _options = {
    minimumMoles:  2,
    maximumMoles: 6,
    pause: 1000,
    duration: 2750
  };

  this.element = el;
  this.openings = [];
  this.options = options || _options;
  this.score = 0;
  this.scoreSpan = document.getElementById('score');
}

Board.prototype.addHole = function addHole (hole) {
  this.element.appendChild(hole.element);
};

Board.prototype.addMole = function addMole (mole) {
  this.openings.push(mole.element);
};

Board.prototype.clear = function clear () {
  board.openings.forEach(function (opening) {
    opening.classList.remove('mole');
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

Board.prototype.shuffle = function shuffle () {
  // shuffle implements the Fisher-Yates random shuffle algorithm. it shuffles the given array in place
  // this implementation is illustrated by Mike Bostock at http:// bost.ocks.org/mike/shuffle/
  var m = this.openings.length, t, i;

  //  While there remain elements to shuffle…
  while (m) {
    //  Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    //  And swap it with the current element.
    t = this.openings[m];
    this.openings[m] = this.openings[i];
    this.openings[i] = t;
  }

  return this.openings;
};
