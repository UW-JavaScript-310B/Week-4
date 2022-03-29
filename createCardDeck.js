/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
const getDeck = () => {
  const suits = ['hearts', 'spades', 'clubs', 'diamonds'];
  var cardsArr = [];

  for (let suit of suits) {
    for (let j = 2; j <= 11; j++) {

      switch (j) {
        case 10:
          cardsArr.push({
            val: j,
            displayVal: `${j}`,
            suit: suit
          });

          cardsArr.push({
            val: j,
            displayVal: 'Jack',
            suit: suit
          });

          cardsArr.push({
            val: j,
            displayVal: 'Queen',
            suit: suit
          });

          cardsArr.push({
            val: j,
            displayVal: 'King',
            suit: suit
          });

          break;
        case 11:
          cardsArr.push({
            val: j,
            displayVal: 'Ace',
            suit: suit
          });
          break;
        default:
          cardsArr.push({
            val: j,
            displayVal: `${j}`,
            suit: suit
          });
          break;
      }
    }
  }
  return cardsArr;
}


const deck = getDeck();
console.log(`Deck length equals 52? ${deck.length === 52}`);


// CHECKS
const cardsWorthTenfunction = () => {
  const cards = getDeck();
  return cards
          .filter((card) => card.val === 10)
          .map(card => `${card.suit} - ${card.displayVal}`)
          .join(', ');
}

const cardsWorthTen = cardsWorthTenfunction();
console.log(`cardsWorthTen : ${cardsWorthTen}`);

const randomCard = deck[Math.floor(Math.random() * 52)];

const cardHasVal = randomCard && randomCard.val && typeof randomCard.val === 'number';
console.log(`Random card has val? ${cardHasVal}`);

const cardHasSuit = randomCard && randomCard.suit && typeof randomCard.suit === 'string';
console.log(`Random card has suit? ${cardHasSuit}`);

const cardHasDisplayVal = randomCard &&
  randomCard.displayVal &&
  typeof randomCard.displayVal === 'string';
console.log(`Random card has display value? ${cardHasDisplayVal}`);