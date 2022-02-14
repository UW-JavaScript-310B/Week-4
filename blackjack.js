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
  drawCard () {
    const randomCard = deck[Math.floor(Math.random() * 52)];
    this.hand.push(randomCard);
    };
}; //TODO

// CREATE TWO NEW CardPlayers
const dealer = new CardPlayer("dealer"); // TODO
const player = new CardPlayer("player"); // TODO

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
  hand.forEach(card => {
    if (card.displayVal === 'Ace'){
      if (total <= 10){
        isSoft = true;
        total += card.val;
      } else {
        total += 1;
      }
    } else {
      total += card.val;
    } 
  });
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
  if (points.totalPts <= 16) {
    return true;
  } else if (points.totalPts == 17 && points.isSoft == true) {
    return true;
  } else {
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
  let msg = `${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`;
  console.log(msg);
  if (msg.trim().length > 0 && document != null && document.body != null && document.body.innerHTML != null)
    document.body.innerHTML += msg + "<br/>";
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
  if (playerScore == 21) {
    return "Player wins after drawing her first 2 cards";
  }
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
  if (dealerScore == 21) {
    return "Dealer wins after drawing her first 2 cards";
  }
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
 