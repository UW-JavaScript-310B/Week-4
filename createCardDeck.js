/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */


const getDeck = () => {
  const suits = ['Spades','Hearts','Diamonds','Clubs'];
  let cards = [];

 for(let s=0; s < suits.length; s++){

   for(let d = 1; d <= 13; d++){
    let displayVal;
    let val;

    if (d ===1){
      displayVal = 'Ace';
      val = 11;
    }else if (d >=2 && d <= 10){
      displayVal = d;
      val = d;
    }else if (d === 11){
      displayVal = "Jack"
      val = 10;
    }else if (d === 12){
      displayVal = "Queen"
      val = 10;
    }else if (d === 13){
      displayVal = "King"
      val = 10;
    }
    cards.push({
    val,
    displayVal,
    suit: suits[s]
  } ); 

   }

 }
 return cards;
}



// CHECKS

const deck = getDeck();
console.log(`Deck length equals 52? ${deck.length === 52}`);
console.log(getDeck());

const randomCard = deck[Math.floor(Math.random() * 52)];

const cardHasVal = randomCard && randomCard.val && typeof randomCard.val === 'number';
console.log(`Random card has val? ${cardHasVal}`);

const cardHasSuit = randomCard && randomCard.suit && typeof randomCard.suit === 'string';
console.log(`Random card has suit? ${cardHasSuit}`);

const cardHasDisplayVal = randomCard &&
  randomCard.displayVal &&
  typeof randomCard.displayVal === 'string';
console.log(`Random card has display value? ${cardHasDisplayVal}`);