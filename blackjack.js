

const blackjackDeck = () =>{

const deck = getDeck();

let val = deck.val;
let displayVal = getDeck().displayVal;
let suit = getDeck().suit;

allCards = ({val}, {display},{suit});
return allCards;
}

/**
 * Represents a card player (including dealer).
 * @constructor
 * @param {string} name - The name of the player
 */

class CardPlayer {
  constructor(name){
    this.name = name;
    this.hand = [];
  }
  drawCard(){
    //selects a card at random from the deck
    //adds card to hand array.
    const rdmCard = Math.floor(Math.random() * (blackjackDeck.length));
    let playerHand = this.hand.push[rdmCard];
  };
}; //TODO

// CREATE TWO NEW CardPlayers
const dealer = new CardPlayer('Dealer'); // TODO
const player = new CardPlayer('Player'); // TODO

/**
 * Calculates the score of a Blackjack hand
 * @param {Array} hand - Array of card objects with val, displayVal, suit properties
 * @returns {Object} blackJackScore
 * @returns {number} blackJackScore.total
 * @returns {boolean} blackJackScore.isSoft
 */
const calcPoints = (hand) => {
  // CREATE FUNCTION HERE 
  total = 0;
  let calcHand = [hand];

  for(let h=0; h < calcHand.length; h++){
    switch(true){
      case ({displayVal} === 'Ace'):
        total += 11
        break;
      case ({val} > 1 && {val} < 10):
        total += {val}
        break;
      case ({displayVal} === '10'):
        total += 10
        break;
      case ({displayVal} === 'Jack'):
        total += 10
        break;
      case ({displayVal} === 'Queen'):
        total += 10
        break;
      case ({displayVal} === 'King'):
          total += 10
          break
    }
    let isSoft = true;
    if (calcHand /* has Ace as 11pts */) {
      isSoft = true;
    } else{ 
      isSoft = false;
      }
    // { val: 11, displayVal: 'Ace', suit: 'diamonds' },
  }
  return total, isSoft;   
}


/**
 * Determines whether the dealer should draw another card.
 * 
 * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
 * @returns {boolean} whether dealer should draw another card
 */
const dealerShouldDraw = (dealerHand) => {
  // CREATE FUNCTION HERE
  //Hint: Use the calculateScore function to determine the dealer's total points.  
  //Use the isSoft property passed back from that function to determine if the dealer
  // has an Ace that is being counted as 11
  const currentPoints = calcPoints(dealerHand);
  const aceValue = dealerHand.isSoft;

  let drawDecision;

  if (currentPoints <= 16){
    drawDecision = true;
  }else if (currentPoints >= 17 && aceValue === true){
    drawDecision = true;
  }else if (currentPoints > 17) {
    drawDecision = false;
  }
  return drawDecision;
}

/**
 * Determines the winner if both player and dealer stand
 * @param {number} playerScore 
 * @param {number} dealerScore 
 * @returns {string} Shows the player's score, the dealer's score, and who wins
 */
const determineWinner = (playerScore, dealerScore) => {
  // CREATE FUNCTION HERE
  //determine the winner (or if there is a tie), based on the dealer's points and the player's points.
  let winner = '';

  if (playerScore < 22 && dealer < 22){
    switch(true){
      case (playerScore > dealerScore):
        winner = 'Player Wins!'
        break;
      case (playerScore < dealerScore):
        winner = 'Dealer Wins.'
        break;
      case (playerScore === dealerScore):
        winner = 'Tie.'
        break
    }
  }else if (playerScore > 21 && dealer < 22){
    winner = 'Dealer Wins.';
  }else if (playerScore < 22 && dealer > 21){
    winner = 'Player Wins!'
  }
  return (`Player has ${playerScore} points. Dealer has ${dealerScore} points. ${winner}`)
}



/**
 * Creates user prompt to ask if they'd like to draw a card
 * @param {number} count 
 * @param {string} dealerCard 
 */
const getMessage = (count, dealerCard) => {
  return `Dealer showing ${dealerCard.displayVal}, your count is ${count}.  Draw card?`
}

/**
 * Logs the player's hand to the console
 * @param {CardPlayer} player 
 */
const showHand = (player) => {
  const displayHand = player.hand.map((card) => card.displayVal);
  console.log(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`);
}

/**
 * Runs Blackjack Game
 */
const startGame = function() {
  player.drawCard();
  dealer.drawCard();
  player.drawCard();
  dealer.drawCard();

  let playerScore = calcPoints(player.hand).total;
  showHand(player);
  while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
    player.drawCard();
    playerScore = calcPoints(player.hand).total;
    showHand(player);
  }
  if (playerScore > 21) {
    return 'You went over 21 - you lose!';
  }
  console.log(`Player stands at ${playerScore}`);

  let dealerScore = calcPoints(dealer.hand).total;
  while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
    dealer.drawCard();
    dealerScore = calcPoints(dealer.hand).total;
    showHand(dealer);
  }
  if (dealerScore > 21) {
    return 'Dealer went over 21 - you win!';
  }
  console.log(`Dealer stands at ${dealerScore}`);

  return determineWinner(playerScore, dealerScore);
}
console.log(startGame());

