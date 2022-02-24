/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
const getDeck = () => {
  const suits = ['hearts', 'diamonds', 'spades', 'clubs'];
  const cards = [];

  for (let i = 0; i < suits.length; i++) { 
      for (let j = 1; j <= 13; j++) {
          let displayVal = j; 
          let val = j;     
          if (j === 10) {
              displayVal = "Jack";
              val = 10; 
          } else if (j === 11) {
              displayVal = "Queen";
              val = 10; 
          } else if (j === 12) {
              displayVal = "King";
              val = 10; 
          } else if (j === 13) {
              displayVal = "Ace";
              val = 11;             
          }
          cards.push({val, displayVal, suit: suits[i]});
      }
  }
  return cards;
}



// CHECKS
// const deck = getDeck();
// console.log(`Deck length equals 52? ${deck.length === 52}`);

// const randomCard = deck[Math.floor(Math.random() * 52)];

// const cardHasVal = randomCard && randomCard.val && typeof randomCard.val === 'number';
// console.log(`Random card has val? ${cardHasVal}`);

// const cardHasSuit = randomCard && randomCard.suit && typeof randomCard.suit === 'string';
// console.log(`Random card has suit? ${cardHasSuit}`);

// const cardHasDisplayVal = randomCard &&
//   randomCard.displayVal &&
//   typeof randomCard.displayVal === 'string';
// console.log(`Random card has display value? ${cardHasDisplayVal}`);