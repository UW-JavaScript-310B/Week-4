/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
const suits = ['hearts', 'spades', 'clubs', 'diamonds'];
const getDeck = () => {
  let deck = [];
  for (let suit of suits){
    for (let number = 1; number <= 13; number++){
      let val = 0;
      let displayVal = "";
      switch(number){
        case 1:
          val = 11;
          displayVal = "Ace";
          break;
        case 11:
          val = 10;
          displayVal = "jack";
          break;
        case 12:
          val = 10;
          displayVal = "queen";
          break;
        case 13:
          val = 10;
          displayVal = "king";
          break;
        default:
          val = number;
          displayVal = String(number);
          break;
      }
     
      deck.push({val: val, displayVal: displayVal, suit: suit});
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