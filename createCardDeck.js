/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */

/*Create a function getDeck that returns an array of 52 cards. There are four suits (hearts, spades, clubs, diamonds). Each suit will have 13 cards:

2 – 10 will have a val equal to the number
'Jack', 'Queen', and 'King' will all have a val of 10
'Ace' will have a val of 11
*/

/*const getDeck = () => {
  const suits = ['hearts', 'spades', 'clubs', 'diamonds'];
  const cards = [];

  suits.forEach(cardGenerate);


  function cardGenerate(suit){
    let cardCount = 0

    for (let i = 0; i < 13; i++){
      cardCount += 1;
      cards.push(cardCount);
    }
  }
  console.log(cards);
  return cards;

};*/

const getDeck = () => {
  const suits = ['hearts', 'spades', 'clubs', 'diamonds'];
  const cards = [];

    let cardCount = 0

    for(let i = 0; i < 13; i++){
      if(i === 0){
        cardCount += 1;
        cards.push({val : 11, suit: suits[0], displayVal : 'Ace'})
      } if(i > 0 && i < 10){
        cardCount += 1;
        cards.push({val : cardCount, suit: suits[0], displayVal : cardCount.toString()});
      } if(i === 10){
        cardCount += 1;
        cards.push({val : 10, suit: suits[0], displayVal : 'Jack'});
      } if(i === 11){
        cardCount += 1;
        cards.push({val : 10, suit: suits[0], displayVal : 'Queen'});
    } if(i === 12){
      cardCount += 1;
      cards.push({val : 10, suit: suits[0], displayVal : 'King'});
    }
  }
  cardCount = 0;
  for(let i = 0; i < 13; i++){
    if(i === 0){
      cardCount += 1;
      cards.push({val : 11, suit: suits[1], displayVal : 'Ace'})
    } if(i > 0 && i < 10){
      cardCount += 1;
      cards.push({val : cardCount, suit: suits[1], displayVal : cardCount.toString()});
    } if(i === 10){
      cardCount += 1;
      cards.push({val : 10, suit: suits[1], displayVal : 'Jack'});
    } if(i === 11){
      cardCount += 1;
      cards.push({val : 10, suit: suits[1], displayVal : 'Queen'});
  } if(i === 12){
    cardCount += 1;
    cards.push({val : 10, suit: suits[1], displayVal : 'King'});
  }
}

cardCount = 0;
for(let i = 0; i < 13; i++){
  if(i === 0){
    cardCount += 1;
    cards.push({val : 11, suit: suits[2], displayVal : 'Ace'})
  } if(i > 0 && i < 10){
    cardCount += 1;
    cards.push({val : cardCount, suit: suits[2], displayVal : cardCount.toString()});
  } if(i === 10){
    cardCount += 1;
    cards.push({val : 10, suit: suits[2], displayVal : 'Jack'});
  } if(i === 11){
    cardCount += 1;
    cards.push({val : 10, suit: suits[2], displayVal : 'Queen'});
} if(i === 12){
  cardCount += 1;
  cards.push({val : 10, suit: suits[2], displayVal : 'King'});
}
}

cardCount = 0;
for(let i = 0; i < 13; i++){
  if(i === 0){
    cardCount += 1;
    cards.push({val : 11, suit: suits[3], displayVal : 'Ace'})
  } if(i > 0 && i < 10){
    cardCount += 1;
    cards.push({val : cardCount, suit: suits[3], displayVal : cardCount.toString()});
  } if(i === 10){
    cardCount += 1;
    cards.push({val : 10, suit: suits[3], displayVal : 'Jack'});
  } if(i === 11){
    cardCount += 1;
    cards.push({val : 10, suit: suits[3], displayVal : 'Queen'});
} if(i === 12){
  cardCount += 1;
  cards.push({val : 10, suit: suits[3], displayVal : 'King'});
}
}

  return cards;

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