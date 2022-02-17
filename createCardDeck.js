/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */

//  createCardDeck
//  2. Create a function getDeck that returns an array of 52 cards. There are four suits (hearts, spades, clubs, diamonds). Each suit will have 13 cards:
//  2 – 10 will have a val equal to the number
//  'Jack', 'Queen', and 'King' will all have a val of 10
//  'Ace' will have a val of 11

const getDeck = () => {
	const deck = [];
  const suits = ['hearts', 'diamonds', 'spades', 'clubs'];
  // for each suit, we need to add 13 cards
  for (let i = 0; i < suits.length; i++) {
  	// for each suit, we need cards 2 - 10
    for (let j = 0; j < 11; j++) {
    	if (j < 9) {
      	deck.push({suit: suits[i], val: j + 2, displayVal: (j + 2).toString()})
      } else if (j === 9 ) {
      	// for each suit, we need royalty cards
      	const royalty = ['jack', 'queen', 'king'];
        for (let k = 0; k < royalty.length; k++) {
        	deck.push({suit: suits[i], val: 10, displayVal: royalty[k]})
        }
      } else {
      	// for each suit, we need an ace
      	deck.push({suit: suits[i], val: 11, displayVal: 'ace' })
      }
    }
    // now the loop starts over with the next suit
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