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
