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
    
    };

    //end of constructor

    //random draw of card from the deck
    drawCard () {
      const randomCard = deck[Math.floor(Math.random() * 52)];
      this.hand.push({
        val: deck.val,
        displayVal: deck.displayVal,
        suit: deck.suit
      });
      //end of drawCard function
  };

  introduce() {
    console.log(`Card Player is ${this.name}.`);
    //end of introduce function
  };

  //end of CardPlayer constructor
}; //TODO



//CREATE TWO NEW CardPlayers
const dealer = new CardPlayer('Dealer'); // TODO
const player = new CardPlayer('Player');; // TODO

dealer.introduce();
// dealer.drawCard();
player.introduce();




/**
 * Calculates the score of a Blackjack hand
 * @param {Array} hand - Array of card objects with val, displayVal, suit properties
 * @returns {Object} blackJackScore
 * @returns {number} blackJackScore.total
 * @returns {boolean} blackJackScore.isSoft
 */


// TODO
const calcPoints = (hand) => {

  let blackJackScore = {
    total: 0,
    isSoft: false
  }


  //determine whether the hand is soft
  const isSoft = function (hand) {
    if (hand.every((card) => displayVal !== 'Ace')) {
      isSoft === false;
    } else if (hand.some((card) => displayVal === 'Ace')) {
      if (val !== 11) {
        isSoft !== false;
      } else if (val === 11) {
        isSoft === true;
      }
    }
    //end of isSoft function
  };

  //calc the total for the hand

  for (let index = 0; index < hand.length; index++) {
    if (hand.displayVal === 'Ace' && hand.val === 11 && (blackJackScore.total + hand.val) > 21)  {
      blackJackScore.total += 1;
    } else if (hand.displayVal === 'Ace' && hand.val === 11 && (blackJackScore.total + hand.val) <= 21) {
      blackJackScore.total += hand.val;
    } else {
      blackJackScore.total += hand.val;
    }

    //end of calcPoints for loop
  }

 console.log(blackJackScore);

  //end of calPoints function
};


/**
 * Determines whether the dealer should draw another card.
 * 
 * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
 * @returns {boolean} whether dealer should draw another card
 */
// TODO
const dealerShouldDraw = (dealerHand) => {
  // CREATE FUNCTION HERE
  let dealerPoints = calcPoints(dealerHand);

  if (dealerPoints.total <= 16) {
    return true;
  } else if (dealerPoints.total === 17 && dealerPoints.isSoft === true) {
    return true;
  } else if (dealerPoints.total > 17) {
    return false;
  }
}


/**
 * Determines the winner if both player and dealer stand
 * @param {number} playerScore 
 * @param {number} dealerScore 
 * @returns {string} Shows the player's score, the dealer's score, and who wins
 */
// TODO
const determineWinner = (playerScore, dealerScore) => {
  if (dealerScore > 21) {
    return `Player score was ${playerScore}. Dealer Score was ${dealerScore}. Dealer scored more than 21 - Player wins`
  } else if (playerScore <= 21 && playerScore > dealerScore) {
    return `Player score was ${playerScore}. Dealer Score was ${dealerScore}. Player wins.`
  } else if (playerScore === dealerScore) {
    return `Player score was ${playerScore}. Dealer Score was ${dealerScore}. Player and Dealer are tied.`
  } else {
    return `Dealer wins with ${dealerScore}.`
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