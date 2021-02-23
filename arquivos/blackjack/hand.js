var Card = require("./cards.js");

function Hand() {
  this.cards = new Array();
}

Hand.prototype.limit = 21;

Hand.prototype.add = function(card) {
  /*if (!card instanceof Card) {
    throw new Error("Tentei adicionar um cartão que não existe");
  }*/
  this.cards.push(card);
};

Hand.prototype.score = function() {
  var score = 0,
    aces = 0;
  this.cards.forEach(function(card) {
    if (card.face == "A") {
      aces++;
    }
    if (card.face == "J" || card.face == "Q" || card.face == "K") {
      score += 10;
    } else if (card.face == "A") {
      score += 1;
    } else {
      score += parseInt(card.face, 10);
    }
  }); /*
  while (score > 21 && aces > 0) {
    score -= 10;
    aces--;
  }*/
  return score;
};

Hand.prototype.toString = function() {
  var string = "";

  this.cards.forEach(function(card) {
    string += card.face + " de " + card.suite + "\n";
  });

  return string;
};

Hand.prototype.bust = function() {
  return this.score() > this.limit;
};

module.exports = Hand;