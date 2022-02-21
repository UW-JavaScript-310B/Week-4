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
  }

  drawCard = () => {
    this.hand.push(blackjackDeck[Math.floor(Math.random() * 52)]);
  };

};

// CREATE TWO NEW CardPlayers
const dealer = new CardPlayer('dealer');
const player = new CardPlayer('player');

/**
 * Calculates the score of a Blackjack hand
 * @param {Array} hand - Array of card objects with val, displayVal, suit properties
 * @returns {Object} blackJackScore
 * @returns {number} blackJackScore.total
 * @returns {boolean} blackJackScore.isSoft
 */
const calcPoints = (hand) => {

  let isSoft = false;
  let total = 0;
  hand.forEach((card) => total += card.val);
  let aceCollection = hand.filter((p) => p.displayVal === 'Ace');

  if (total <= 21) {
    isSoft = (aceCollection !== null && aceCollection.length > 0);
  }
  else if (total > 21) {
    if (aceCollection !== null) {
      let aceCount = aceCollection.length;
      if (aceCount === 1)  // Only one ace is present
      {
        total -= 10;
      }
      else                // multiple aces
      {
        total -= 10 * (aceCount - 1);
        if (total > 21) {
          total -= 10;
        }
        else {            // There remains one ace which is still used as 11
          isSoft = true;
        }
      }
    }
  }

  return { isSoft, total };
}

/**
 * Determines whether the dealer should draw another card.
 * 
 * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
 * @returns {boolean} whether dealer should draw another card
 */
const dealerShouldDraw = (dealerHand) => {
  let currentDealerState = calcPoints(dealerHand);
  return (currentDealerState.total < 21);
}

/**
 * Determines the winner if both player and dealer stand
 * @param {number} playerScore 
 * @param {number} dealerScore 
 * @returns {string} Shows the player's score, the dealer's score, and who wins
 */
const determineWinner = (playerScore, dealerScore) => {
  let result = '';
  if (playerScore > dealerScore) {
    result = 'Winner: Player';
  }
  else if (playerScore < dealerScore) {
    result = 'Winner: Dealer';
  }
  else {
    result = 'Result: Tie';
  }
  return `Player Score: ${playerScore}, Dealer Score: ${dealerScore}, ${result}`;
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