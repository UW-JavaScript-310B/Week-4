/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
const getDeck = () => {
  // Define suits array with 4 items: hearts, diamonds, clubs, spades
  const suits = ['hearts','diamonds','clubs','spades'];
  // Define cards array
  const cards = [];
  // Set values (val, displayVal, suit) for each card in cards array
  // Scan through suits array
  for (let i = 0; i < suits.length; i++) {
    // For loops from 1 to 13
    for (let j = 1; j <=13; j++) {
      // Define val & displayVal vars
      let val;
      let displayVal;
      switch (j) {
        case 1:
          val = 11;
          displayVal = 'Ace';
          break;
        case 11:
          val = 10;
          displayVal = 'Jack';
          break;
        case 12:
          val = 10;
          displayVal = 'Queen';
          break;
        case 13:
          val = 10;
          displayVal = 'King';
          break;
        default:
          val = j;
          displayVal = j.toString();
          break;
      }
      // Set value for each card
      cards.push({
        val,
        displayVal,
        suit: suits[i]
        });
    }
  }
  return cards;
}

// CHECKS
const deck = getDeck();
console.log(`Deck length equals 52? ${deck.length === 52}`);

const randomCard = deck[Math.floor(Math.random() * 52)];

const cardHasVal = randomCard && randomCard.val && typeof randomCard.val === 'number';
console.log(`Random card has val? ${cardHasVal}`);

const cardHasSuit = randomCard && randomCard.suit && typeof randomCard.suit === 'string';
console.log(`Random card has suit? ${cardHasSuit}`);

const cardHasDisplayVal = randomCard &&
  randomCard.displayVal &&
  typeof randomCard.displayVal === 'string';
console.log(`Random card has display value? ${cardHasDisplayVal}`);