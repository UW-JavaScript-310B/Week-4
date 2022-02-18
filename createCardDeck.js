/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */

const getDeck = () => {
  const suits = ['hearts', 'diamonds', 'spades', 'clubs'];
  const cards = [];

  for (let index = 0; index < suits.length; index++) {
    for (let j = 1; j <= 13; j++) {
      let displayVal;
      let val;
      switch (true) {
        case (j === 11):
          displayVal = "jack";
          val = 10;
          break;
        case (j === 12):
          displayVal = "queen";
          val = 10;
          break;
        case (j === 13):
          displayVal = "king";
          val = 10;
          break;
        case (j === 1):
          displayVal = "ace";
          val = 11;
          break;
        default:
          displayVal = j;
          val = j;
          break;
      }
      cards.push({
        val,
        displayVal,
        suit: suits[index]
      })
    }
  }
  return cards;
};

// CHECKS
const deck = getDeck();
console.log(`Deck length equals 52? ${deck.length === 52}`);

const randomCard = deck[Math.floor(Math.random() * 52)];
console.log(randomCard);
const cardHasVal = randomCard && randomCard.val && typeof randomCard.val === 'number';
console.log(`Random card has val? ${cardHasVal}`);

const cardHasSuit = randomCard && randomCard.suit && typeof randomCard.suit === 'string';
console.log(`Random card has suit? ${cardHasSuit}`);

const cardHasDisplayVal = randomCard &&
  randomCard.displayVal &&
  typeof randomCard.displayVal === 'string';
console.log(`Random card has display value? ${cardHasDisplayVal}`);