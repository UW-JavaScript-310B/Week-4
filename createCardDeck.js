/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
const getDeck = () => {
  let card = {
    val: null,
    displayVal: '',
    suit: ''
  }
  let suits = ['hearts', 'spades', 'clubs', 'diamonds'];
  let result = [];

  suits.forEach((suit)=>{
  
    for (let j = 1; j <= 13; j++) {
     switch (j) {    
      case 1:case 2:case 3:case 4:case 5:case 6:case 7:case 8:case 9:
        card.val = j+1;
        card.displayVal = (j+1).toString();
        card.suit = suit;
   
      break;
        case 10:
        card.val = 10,
        card.displayVal = 'Jack',   
        card.suit = suit;
        break;
        
        case 11:
          card.val = 10,
          card.displayVal = 'Queen',
          card.suit = suit;
          break;
        
        case 12:
          card.val = 10,
          card.displayVal = 'King',
          card.suit = suit;
          
          break;
        case 13:
          card.val = 11,
          card.displayVal = 'Ace',
          card.suit = suit;
          
         break;
        
     }
  
     result.push({val: card.val, displayVal: card.displayVal, suit: card.suit});
     
    } 
  });
  return result;

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
