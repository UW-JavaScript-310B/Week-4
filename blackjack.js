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
  }

  drawCard(){
    let random = Math.ceil(Math.random()*52);
    this.hand.push(blackjackDeck[random]);
  }

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
  let total = 0;
  let isSoft = false;

  for(let i = 0; i<hand.length;i++){
    if(hand[i].displayVal === 'Ace'){
        if(total <= 10){
          total +=hand[i].val;
          isSoft = true;
        }
        else{
          total +=1;
        }
    }
    else{
      total += hand[i].val;
    }
  }
  return {total: total, isSoft: isSoft};
}

/**
 * Determines whether the dealer should draw another card.
 * 
 * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
 * @returns {boolean} whether dealer should draw another card
 */
const dealerShouldDraw = (dealerHand) => {
  // CREATE FUNCTION HERE
let points = calcPoints(dealerHand);

if(points.total <= 16){
  return true;
}
else if(points.total === 17 && points.isSoft === true){
  return true;
}
else if (points.total >= 17){
  return false;
}
}

/**
 * Determines the winner if both player and dealer stand
 * @param {number} playerScore 
 * @param {number} dealerScore 
 * @returns {string} Shows the player's score, the dealer's score, and who wins
 */
const determineWinner = (playerScore, dealerScore) => {
  // CREATE FUNCTION HERE
  let winner = (playerScore > dealerScore)  ? "player" : ((dealerScore > playerScore) ? "dealer" : "tie");
  let text = document.createElement("h3");
  text.innerText = `playerScore=${playerScore}, dealerScore=${dealerScore}, winner=${winner}`;
  document.getElementById("innerDiv").append(text);
  return `playerScore=${playerScore}, dealerScore=${dealerScore}, winner=${winner}`;
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
  let para = document.createElement("p");
  para.innerText = `${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`
  document.getElementById("innerDiv").append(para);

  console.log(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`);
}

/**
 * Runs Blackjack Game
 */
const startGame = function() {
  let h3 = document.createElement("h3");
  h3.innerText = "The game has started!!!"
  document.getElementById("innerDiv").append(h3);
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
      let h3 = document.createElement("h3");
        h3.innerText = "You went over 21 - you lose!"
        document.getElementById("innerDiv").append(h3);
        h3.style.color = 'red';
    return 'You went over 21 - you lose!';
  }
  else if (playerScore === 21){
    let text = document.createElement("h3");
    text.innerText = 'you win!';
    document.getElementById("innerDiv").append(text);
    return 'You win!';
  }
  let text = document.createElement("h3");
  text.innerText = `Player stands at ${playerScore}`;
  document.getElementById("innerDiv").append(text);
  console.log(`Player stands at ${playerScore}`);

  let dealerScore = calcPoints(dealer.hand).total;
  while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
    dealer.drawCard();
    dealerScore = calcPoints(dealer.hand).total;
    showHand(dealer);
  }
  if (dealerScore > 21) {

    let text = document.createElement("h3");
    text.innerText = 'Dealer went over 21 - you win!';
    document.getElementById("innerDiv").append(text);
    text.style.color = 'red';
    return 'Dealer went over 21 - you win!';
  }
  else if(dealerScore === 21){
    let text = document.createElement("h3");
    text.innerText = 'you win!';
    document.getElementById("innerDiv").append(innerText);
    return 'Dealer win!';
  }
  let text1 = document.createElement("h3");
  text1.innerText = `Dealer stands at ${dealerScore}`;
  document.getElementById("innerDiv").append(text1);
  
  console.log(`Dealer stands at ${dealerScore}`);

  return determineWinner(playerScore, dealerScore);
}
// console.log(startGame());