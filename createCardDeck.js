/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */

 const getDeck = () => {
  let cardDeck = [];
  const suits = ['hearts', 'spades', 'clubs', 'diamonds'];
  const dingbat = ['hearts', 'spades', 'clubs', 'diams'];
  const faceCards = ['J', 'Q', 'K', 'A'];
  for(let i = 0; i < 4; i++) {
    for(let j = 2; j < 11; j++) {
      cardDeck.push({
        val: j,
        displayVal: j.toString(),
        suit: suits[i],
        dingbat: dingbat[i],
        dealt: false
      })
    }
    for(let j = 0; j < 3; j++) {
      cardDeck.push({
        val: 10,
        displayVal: faceCards[j],
        suit: suits[i],
        dingbat: dingbat[i],
        dealt: false
      })
    }
    cardDeck.push({
        val: 11,
        displayVal: faceCards[3],
        suit: suits[i],
        dingbat: dingbat[i],
        dealt: false
      })
  }
  return cardDeck;
}

getDeck();

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
