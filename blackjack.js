const blackjackDeck = getDeck();

/**
 * Represents a card player (including dealer).
 * @constructor
 * @param {string} name - The name of the player
 */
class CardPlayer {
  constructor(name) {
    this.name = name;
    this.hand = [];
    // this.hand = [{val: 2, displayVal: 2, suit: 'clubs'},{val: 11, displayVal: 'ace', suit: 'clubs'},{val: 11, displayVal: 'ace', suit: 'clubs'}];
  }
  drawCard() {
    const randomCard = blackjackDeck[Math.floor(Math.random() * 52)];
    return this.hand.push(randomCard);
  }
};

// CREATE TWO NEW CardPlayers
const dealer = new CardPlayer('Dealer'); // TODO
const player = new CardPlayer('Player'); // TODO

console.log("dealer:", dealer.hand)
console.log("player:", player.hand)
/**
 * Calculates the score of a Blackjack hand
 * @param {Array} hand - Array of card objects with val, displayVal, suit properties
 * @returns {Object} blackJackScore
 * @returns {number} blackJackScore.total
 * @returns {boolean} blackJackScore.isSoft
 */
const calcPoints = (hand) => {
  let total = hand.reduce((previousValue, currentValue) => previousValue + currentValue.val, 0);
  let isSoft = false;
  const acePresent = hand.find(element => element.displayVal === 'ace');
  for (let i = 0; i < hand.length; i++) {
    if (acePresent > 1) {
      hand[i].val === 1;
      isSoft = true;
    } else {
      hand[i].val === hand.val;
    }
  }
  return blackJackScore = {total, isSoft};
};


/**
 * Determines whether the dealer should draw another card.
 * 
 * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
 * @returns {boolean} whether dealer should draw another card
 */
// bug fix: dealerHand only returning the displayVal of first card in index. 
// is this because in blackjack, dealer has one card face down, and one card face up?
const dealerShouldDraw = (dealerHand) => {
  const dealerScore = calcPoints(dealerHand);
  if (dealerScore.total <= 16 || (dealerScore.total === 17 && dealerScore.isSoft == false)) {
    return true;
  } else {
    return false;
  }
};

/**
 * Determines the winner if both player and dealer stand
 * @param {number} playerScore 
 * @param {number} dealerScore 
 * @returns {string} Shows the player's score, the dealer's score, and who wins
 */

const determineWinner = (playerScore, dealerScore) => {
  console.log("player's score: ", playerScore, "dealer's score: ", dealerScore);
  if (playerScore > dealerScore) {
    return console.log(player, " wins")
  } else if (playerScore < dealerScore) {
    return console.log(dealer, " wins")
  } else if (playerScore === dealerScore) {
    return console.log("no winner, PUSH");
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
const startGame = function () {
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