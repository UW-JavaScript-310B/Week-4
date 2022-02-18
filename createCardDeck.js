/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
const getDeck = () => {
    let cardSuits = ['diamonds', 'hearts', 'clubs', 'spades']
    let cardValueMap = new Map();
    cardValueMap.set('Ace', 11);
    cardValueMap.set('2', 2);
    cardValueMap.set('3', 3);
    cardValueMap.set('4', 4);
    cardValueMap.set('5', 5);
    cardValueMap.set('6', 6);
    cardValueMap.set('7', 7);
    cardValueMap.set('8', 8);
    cardValueMap.set('9', 9);
    cardValueMap.set('10', 10);
    cardValueMap.set("Jack", 10);
    cardValueMap.set("Queen", 10);
    cardValueMap.set("King", 10);
    let cards = new Array(52);
    let deckIdx = 0;
    for (const item of cardSuits) {
        cardValueMap.forEach((value, key) => {
            //let card = {val: value, displayVal: key, suit: item}
            //console.log(`${card.val} ${card.displayValue} ${card.suit}`)
            //cards[deckIdx] = card
            cards[deckIdx] = {val: value, displayVal: key, suit: item}
            //console.log(`${cards[deckIdx].val} ${cards[deckIdx].displayValue} ${cards[deckIdx].suit}`)
            deckIdx++
        });
    }
    return cards
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