/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
const getDeck = () => {

    let suits = ['hearts', 'spades', 'clubs', 'diamonds']
    let values = {'2':2, '3':3, '4':4, '5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'jack':10,'queen':10,'king':10,'ace':11}
    let cards =[]
    for (let suit of suits){
        for (let value in values){
            const card =
                { val: values[value], displayVal: value, suit: suit }
            cards.push(card)
        }
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