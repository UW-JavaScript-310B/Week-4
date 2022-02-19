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

    this.drawCard = function() {
      this.hand.push(deck[Math.floor(Math.random() * 52)]);
      
    }
  }

  introduce() {
    console.log(`Card player is ${this.name}`);
  }
};

// CREATE TWO NEW CardPlayers
const player = new CardPlayer('Player');
const dealer = new CardPlayer('Dealer');

player.introduce();
dealer.introduce();
/**
 * Calculates the score of a Blackjack hand
 * @param {Array} hand - Array of card objects with val, displayVal, suit properties
 * @returns {Object} blackJackScore
 * @returns {number} blackJackScore.total
 * @returns {boolean} blackJackScore.isSoft
 */


const calcPoints = (hand) => {
  let blackJackScore = {
    total: 0,
    isSoft: true

  };


  let isSoft = function (hand) {
    if (hand.some((card) => card.displayVal === 'Ace' && hand.val === 11)) {
      isSoft = true
    } else if (hand.every((card) => card.displayVal !== 'Ace')) {
      isSoft = false;
    } else if (hand.every((card) => hand.val < 11)) {
      isSoft = false;
    }
    return isSoft;
  }


  function totalScore(hand) {
    blackJackScore.total = 0;
    for (let index = 0; index < hand.length; index++) {
      if ((blackJackScore.total + hand[index].val > 21) && hand[index].displayVal === 'Ace' && hand[index].val === 11) {
        blackJackScore.total += 1
      } else {
        blackJackScore.total += hand[index].val

      }

    }
    return blackJackScore.total;
  }
   isSoft(hand);
   totalScore(hand);
  return blackJackScore;
}



/**
 * Determines whether the dealer should draw another card.
 * 
 * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
 * @returns {boolean} whether dealer should draw another card
 */
const dealerShouldDraw = (dealerHand) => {
  let dealerPoints = calcPoints(dealerHand);
  if (dealerPoints.total <= 16) {
    return true
  } else if (dealerPoints.total === 17 && dealerPoints.isSoft === true) {
    return true
  } else if (dealerPoints.total > 17) {
    return false
  }

}

/**
 * Determines the winner if both player and dealer stand
 * @param {number} playerScore 
 * @param {number} dealerScore 
 * @returns {string} Shows the player's score, the dealer's score, and who wins
 */
const determineWinner = (playerScore, dealerScore) => {
  if (dealerScore > 21) {
    return `Player score = ${playerScore}, Dealer score = ${dealerScore} Dealer loses!`
  } else if (playerScore <= 21 && playerScore > dealerScore) {
    return `Player score = ${playerScore}, Dealer score = ${dealerScore} Player wins!`
  } else if (playerScore === dealerScore) {
    return `Player score = ${playerScore}, Dealer score = ${dealerScore} It's a tie!`
  } else (dealerScore <= 21 && dealerScore > playerScore); {
    return `Player score = ${playerScore}, Dealer score = ${dealerScore} Dealer wins!`
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