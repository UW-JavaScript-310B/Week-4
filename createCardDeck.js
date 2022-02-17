/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
 const getDeck = () => {
  //array to hold four suits
 const suitsArr = ['hearts', 'spades', 'clubs', 'diamonds'];
 // array to hold card symbol
 const cardSymbolArr = ['Jack', 'Queen', 'King', 'Ace'];
 const cardArr = [];
// Loop through each suit in the array
// create each set of 13 cards in each suit
// 9 cards for value from 2 - 10
// 3 cards for 3 symbols in the cardSymbol array
// 1 card for Ace symbol
 for (let s in suitsArr) 
 {

   //loop from 2 to 10 value
   for (let i = 2; i <= 10; i++)
   {
     //add card to deck
     cardArr.push({val: i, displayVal: i.toString(), suit: suitsArr[s]});
    
   }
   // loop through each symbol in the cardSymbolArr
   for (let c in cardSymbolArr)
   {
     //if symbol is an Ace, set displayVal to 11
     if (cardSymbolArr[c] === 'Ace')
     {
       
       cardArr.push({val: 11, displayVal: cardSymbolArr[c], suit: suitsArr[s]});
     }
     // if symbol is not an Ace, set displayVal to 10
     else
     {
       cardArr.push({val: 10, displayVal: cardSymbolArr[c], suit: suitsArr[s]});
     }
   }
 }

 return cardArr;
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