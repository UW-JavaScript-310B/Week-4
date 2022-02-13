/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
const getDeck = () => {
  const suits = ["hearts", "diamonds", "spades", "clubs"];
  let cards = [];
  let displayVal = "";
  let val = "";

  for (let index = 0; index < suits.length; index++) {
    for (let j = 1; j <= 13; j++) {
      switch (j) {
        case 1:
          displayVal = "ace";
          val = 11;
          break;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
          displayVal = j;
          val = j;
          break;
        case 11:
          displayVal = "jack";
          val = j;
          break;
        case 12:
          displayVal = "queen";
          val = j;
          break;
        case 13:
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
console.log(`Deck length equals 52? ${deck.length === 52}`);

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
