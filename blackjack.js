const blackjackDeck = getDeck();



/**
 * Represents a card player (including dealer).
 * @constructor
 * @param {string} name - The name of the player
 */

class CardPlayer {
  constructor(name){ 
  this.name = name;
  this.hand = [];
  this.drawCard = function(){
    let cardNumber = Math.floor(Math.random() * 52);
    this.hand.push(blackjackDeck[cardNumber]);
  }
  }
}; //TODO

// CREATE TWO NEW CardPlayers
const dealer = new CardPlayer('Dealer'); // TODO
const player = new CardPlayer('Player') // TODO



/**
 * Calculates the score of a Blackjack hand
 * @param {Array} hand - Array of card objects with val, displayVal, suit properties
 * @returns {Object} blackJackScore
 * @returns {number} blackJackScore.total
 * @returns {boolean} blackJackScore.isSoft
 */
  
const calcPoints = (hand) => {
  let aceAmount = 0;
  let blackJackScore ={
    isSoft: true ,
    total: 0
  }

  for (let i = 0; i < hand.length; i++){
    if(hand[i].displayVal === 'Ace'){
      aceAmount += 1;
    }
    if(hand[i].displayVal === 'Ace'){
      if(aceAmount > 1){
        if(hand[i].displayVal === 'Ace'){
          aceAmount += 1
          hand[i].val = 1
        }else{
          continue
        }
      } 
      }
      blackJackScore.total +=hand[i].val
  }

  if(aceAmount > 0){
    blackJackScore.isSoft = true;
    return blackJackScore.total;
  }else{
    blackJackScore.isSoft = false;
    return blackJackScore.total
  }
}

/**
 * Determines whether the dealer should draw another card.
 * 
 * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
 * @returns {boolean} whether dealer should draw another card
 */
const dealerShouldDraw = (dealerHand) => {
  let dealerTotal = function dealerTotalFunc (dealerHand){
    calcPoints();
    return (score > 16);
  }

  return dealerTotal;


}

/**
 * Determines the winner if both player and dealer stand
 * @param {number} playerScore 
 * @param {number} dealerScore 
 * @returns {string} Shows the player's score, the dealer's score, and who wins
 */
const determineWinner = (playerScore, dealerScore) => {
  /*let playerScore = player.calcPoints(hand);
  let dealerScore = dealer.calcPoints(dealerHand);*/

  if(playerScore <= 21){
    return playerwin;
  } else if (dealerScore <= 21){
      return dealerwin;
  } else if (playerScore === dealerScore){
    return "It's a draw";
  }
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

  let playerScore = calcPoints(player.hand);
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

  let dealerScore = calcPoints(dealer.hand);
  while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
    dealer.drawCard();
    dealerScore = calcPoints(dealer.hand);
    showHand(dealer);
  }
  if (dealerScore > 21) {
    return 'Dealer went over 21 - you win!';
  }

  
  console.log(`Dealer stands at ${dealerScore}`);


  return determineWinner(playerScore, dealerScore);
  
}
 console.log(startGame());