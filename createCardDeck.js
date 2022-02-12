/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */

 class Card {
  constructor(val, displayVal, suit) {
    this.val = val;
    this.displayVal = displayVal;
    this.suit = suit;
  }
}

const getDeck = () => {
  let deck = [];
  deck = buildSuit(deck, 'hearts');
  deck = buildSuit(deck, 'spades');
  deck = buildSuit(deck, 'clubs');
  deck = buildSuit(deck, 'diamonds');
  return deck;
}

const buildSuit = (deck, suit) => {
  for (let cardNum = 1; cardNum <= 13; cardNum++) {
    let val;
    let displayVal;
    switch(cardNum) {
      case cardNum < 10:
        val = cardNum;
        displayVal = cardNum;
        break;
      case cardNum == 10:
        val = 10;
        displayVal = "Jack";
        break;
      case cardNum == 11:
        val = 10;
        displayVal = "Queen";
        break;
      case cardNum == 12:
        val = 10;
        displayVal = "King";
        break;
      default:
        val = 11;
        displayVal = "Ace";
      let newCard = new Card(val, displayVal, suit);
      deck.push(newCard);
    }   
  }
  return deck;
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