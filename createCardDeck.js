/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
const getDeck = () => {
    let thisDeck = [];
    const suits = ['diamonds', 'spades', 'hearts', 'clubs'];
    const values = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];

    suits.forEach( suit => {
        values.forEach( value => {
            let cardValue = null;
            if (value === 'Ace') { 
                cardValue = {val: 11, suit: suit, displayVal: value}; 
            }
            
            else if (value === 'Jack' || value === 'Queen' || value === 'King') {
                cardValue = {val: 10, suit: suit, displayVal: value}; 
            }
            
            else if (parseInt(value) >= 2 && parseInt(value) <= 10) {
                cardValue = {val: parseInt(value), suit: suit,  displayVal: value};
            }

            thisDeck.push(cardValue);
            }
        )}
    );

    return thisDeck;
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