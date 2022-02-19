/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
const getDeck = () => {
const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const cards = [];

for (let i = 0; i < suits.length; i++) {

  let displayVal;
  let val;

  for (let j = 1; j <= 13; j++) {

    switch (true) {
      case (j === 1):
        displayVal = 'Ace';
        val = 11;
        break;
      case (j > 1 && j <= 10):
        displayVal = j;
        val = j;
        break;
      case (j === 11):
        displayVal = 'Jack';
        val = 10;
        break;
      case (j === 12):
          displayVal = 'Queen';
          val = 10;
          break;
      case (j === 13):
          displayVal = 'King';
          val = 10;
          break;

    }

    cards.push({
      index: j,
      displayVal: displayVal,
      val: val,
      suit: suits[i]

    }
     
    );
    
  }; 
 
};

return cards

}

console.log(getDeck())

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
  console.log(randomCard);
console.log(`Random card has display value? ${cardHasDisplayVal}`);