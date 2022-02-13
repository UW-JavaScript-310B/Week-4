/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
const getDeck = () => {

  const suits = ['clubs', 'diamonds', 'hearts', 'spades'];
  let cards = [];

  //loop thru four suits and associate 13 cards with each
  for (let i = 0; i < suits.length; i++) {

    let displayVal;
    let val;

    //create a new card with value 1-13 for each suit
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
          //end of switch statement
      }
      // console.log(j, val, displayVal, suits[i]);
      // console.log(`index: ${j}, Value: ${val}, Display Value: ${displayVal}, Suit: ${suits[i]`);
      // let newDeck = console.log(j, j.val, j.displayVal, suits[i]);
      // return(newDeck);



      //push the card deck into the card array
      cards.push({
        index: j,
        val: val,
        displayVal: displayVal,
        suit: suits[i]
      });      

  

      //end of four loop j to create 13 cards for each suit
    };

    //end of loop i to create four suits of cards
  };
  return(cards);
};

console.log(getDeck());

//CHECKS
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