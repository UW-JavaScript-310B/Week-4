/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
const getDeck = () => {

  const suits = ['clubs', 'diamonds', 'hearts', 'spades'];
  const cards = [];
  // let suit = [];


  for (let i = 0; i < suits.length; i++) {
    let displayVal
    let val

    for (let j = 1; j <= 13; j++) {
      switch (j) {
        case (j === 1):
          displayVal = 'Ace';
          val = 11;
        case (j > 1 && j <= 10):
          displayVal = j;
          val = j;
        case (j === 11):
          displayVal = 'Jack';
          val = 10;
        case (j === 12):
          displayVal = 'Queen';
          val = 10;
        case (j === 13):
          displayVal = 'King';
          val = 10;
        // default:
          // displayVal = '';
          // val = 0;
      }

      console.log(j);
      console.log(displayVal);
      console.log(val);
      console.log(suits[i])

      cards.push({
        val,
        displayVal,
        suit: suits[i]
      });

    };



    console.log(cards)

  };
};



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