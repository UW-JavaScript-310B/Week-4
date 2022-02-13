/**
 * 
 * createCardDeck
2. Create a function getDeck that returns an array of 52 cards. There are four suits (hearts, spades, clubs, diamonds). Each suit will have 13 cards:

2 – 10 will have a val equal to the number
'Jack', 'Queen', and 'King' will all have a val of 10
'Ace' will have a val of 11
 * 
 * 
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
const getDeck = () => {
  const suits = ["heart", "diamond", "spade", "club"];
  let cards = [];
  let displayVal = "";
  let val = "";

  for (let index = 0; index < suits.length; index++) {
    for (let j = 1; j <= 13; j++) {
      //typeof true;
      //console.log(j);
      //console.log("J is a =>" + typeof j);
      switch (j) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
          console.log("here");
          displayVal = j;
          val = j;
          break;
        case j === 11:
          displayVal = "jack";
          val = j;
        case j === 12:
          displayVal = "queen";
          val = j;
        case j === 13:
          displayVal = "king";
          val = j;
        default:
          break;
      }

      cards.push({ val, displayVal, suit: suits[index] });
    }
  }
  return cards;
};

// CHECKS
const deck = getDeck();
console.log(
  `Deck length equals 52? ${deck.length === 52} It equals ${deck.length}`
);
console.log(deck[4]);

const randomCard = deck[Math.floor(Math.random() * 52)];

const cardHasVal =
  randomCard && randomCard.val && typeof randomCard.val === "number";
console.log(`Random card has val? ${cardHasVal}`);

const cardHasSuit =
  randomCard && randomCard.suit && typeof randomCard.suit === "string";
console.log(`Random card has suit? ${cardHasSuit}`);

const cardHasDisplayVal =
  randomCard &&
  randomCard.displayVal &&
  typeof randomCard.displayVal === "string";
console.log(`Random card has display value? ${cardHasDisplayVal}`);
