// var whackamole = function () {
//   var game = {
//     board: document.getElementById('board'),
//     scoreSpan: document.createElement('span'),
//     openings: [],
//     score: 0,
//     minimumMoles: 2,
//     maximumMoles: 4,
//     shuffle: function (array) {
//       var m = array.length, t, i;

//       // While there remain elements to shuffle…
//       while (m) {
//         // Pick a remaining element…
//         i = Math.floor(Math.random() * m--);

//         // And swap it with the current element.
//         t = array[m];
//         array[m] = array[i];
//         array[i] = t;
//       }

//       return array;
//     },
//     hasClass: function (element, cls) {
//       return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
//     },
//     setupBoard: function () {
//       var that = this;
//       for (var i = 0; i < 16; i++) {
//         var circle = document.createElement('div');
//         circle.classList.add('circle');

//         var mole = document.createElement('div');
//         this.openings.push(mole);
//         circle.appendChild(mole);

//         this.board.appendChild(circle);

//         this.board.addEventListener('click', function(e) {
//           if (that.hasClass(e.target, 'mole')) {
//             console.log('got it!');
//             that.scoreSpan.innerHTML = ++that.score;
//           }
//         });
//       }
//     },
//     setupScore: function () {
//       this.scoreSpan.id = 'score';
//       this.scoreSpan.innerHTML = this.score;

//       var scoreP = document.createElement('p');
//       scoreP.innerHTML = 'Score: ';
//       scoreP.appendChild(this.scoreSpan);
//       board.appendChild(scoreP);
//     },
//     run: function () {
//       var that = this;
//       console.log('this', this);
//       console.log('openings', this.openings);
//       this.openings.forEach(function (opening) {
//         opening.classList.remove('mole');
//       });

//       setTimeout(function () {
//         var shuffled = that.shuffle(that.openings);
//         var random = Math.floor(Math.random() * that.maximumMoles) + that.minimumMoles;

//         for (var i = 0; i < random; i++) {
//           shuffled[i].classList.add('mole');
//         }
//       }, 1000);

//       setTimeout(this.run.bind(this), 2750);
//     },
//     initialize: function () {
//       this.setupBoard();
//       this.setupScore();
//       this.run();
//     }
//   };

//   console.log('game', game);
//   return {
//     init: game.initialize.bind(game)
//   };
// }();

// window.addEventListener('DOMContentLoaded', function () {
//   console.log('whackamole', whackamole);
//   whackamole.init();
// });

var whackamole = (function () {
  var board = document.getElementById('board');
  var openings = [];
  var options = {
    minimumMoles:  2 || minimum,
    maximumMoles: 4 || maximum,
    pause: 1000 || pause,
    duration: 2750 || duration
  };

  //shuffle implements the Fisher-Yates random shuffle algorithm. it shuffles the given array in place in O(n) time
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

  //hasClass checks a DOM element to determine if it contains a class.
  function hasClass (element, cls) {
    //without the spaces being added, the function will return true if cls is present within another class name
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }

  //setupBoard creates the board for the game by adding the hole elements and the elements which will become moles, as well as the score and event listener
  function setupBoard () {
    var score = 0;

    //16 gives us a nice 4 x 4 board
    for (var i = 0; i < 16; i++) {
      var circle = document.createElement('div');
      circle.classList.add('circle');

      var mole = document.createElement('div');
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
        scoreSpan.innerHTML = ++score;
      }
    });
  };

  //run creates the random moles for each round
  function run () {
    //remove the event listeners from the last round to ensure a clean slate each round
    openings.forEach(function (opening) {
      opening.classList.remove('mole');
    });

    //running the shuffle code in the set timeout allows for a pause between rounds
    setTimeout(function () {
      var shuffled = shuffle(openings);
      var random = Math.floor(Math.random() * options.maximumMoles) + options.minimumMoles;

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

// var whacAMole = (function () {
//     var CONGRATULATIONS = 'Well done you are The Whac a Mole champion!',
//         HEIGHT = 4,
//         WIDTH = 7,
//         LEVELUP = 100,
//         initialize,
//         levelHolder,
//         level,
//         li,
//         liElements = [],
//         prevMole,
//         prepGame,
//         prepStage,
//         renderMole,
//         renderStage,
//         setUpEvents,
//         scoreHolder,
//         score,
//         stage,
//         span,
//         speed = 1100,
//         startGame,
//         timer,
//         utils = {
//             id: function (id) {
//                 return document.getElementById(id);
//             },
//             getNodeAsInt: function (parent) {
//                 return parent.firstChild.nodeValue - 0;
//             },
//             setFirstChildValue: function (parentElem, value) {
//                 parentElem.firstChild.nodeValue = value;
//             },
//             setTimer: function (func, ms) {
//                 return setInterval(func, ms);
//             }
//         };

//     initialize = function () {
//         prepStage();
//         renderStage();
//         prepGame();
//         setUpEvents();
//         startGame();
//     };

//     prepStage = function () {
//         span = document.createElement('span');
//         li = document.createElement('li');
//         stage = document.getElementsByTagName('ul')[0];
//     };

//     renderStage = function () {
//         for (var i = 0; i < (HEIGHT * WIDTH); i++) {
//             var cloneLi = li.cloneNode(false),
//                 cloneSpan = span.cloneNode(false);

//             cloneLi.appendChild(cloneSpan);
//             stage.appendChild(cloneLi);
//             liElements.push(cloneLi);
//         }
//     };

//     prepGame = function () {
//         levelHolder = utils.id('level');
//         level = utils.getNodeAsInt(levelHolder);
//         scoreHolder = utils.id('score');
//         score = utils.getNodeAsInt(scoreHolder);
//     };

//     setUpEvents = function () {
//         stage.addEventListener('click', function(e) {
//             if (e.target && 'span' === e.target.nodeName.toLowerCase()) {
//                 if ('mole' === e.target.parentNode.className ) {
//                     score += 10;
//                     utils.setFirstChildValue(scoreHolder, score);
//                     e.target.parentNode.className = '';

//                     if (0 === score%100) {
//                         clearInterval(timer);
//                         if (1000 === score) {
//                             scoreHolder.parentNode.innerHTML = CONGRATULATIONS;
//                         } else {
//                             speed -= LEVELUP;
//                             timer = utils.setTimer(renderMole, speed);

//                             level++;
//                             utils.setFirstChildValue(levelHolder, level);
//                         }
//                     }
//                 }
//             }
//         }, false);
//     };

//     startGame = function () {
//         timer = utils.setTimer(renderMole, speed);
//     };

//     renderMole = function () {
//         if (undefined !== prevMole) prevMole.className = '';
//         prevMole = liElements[Math.floor((Math.random()*(HEIGHT * WIDTH))+1)-1];
//         prevMole.className = 'mole';
//     };

//     return {
//         init: initialize
//     };
// })();

// window.addEventListener('DOMContentLoaded', function () {
//     whacAMole.init();
// });