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
    this.drawCard = function () {
      let randomCard = deck[Math.floor(Math.random() * 52)];
      this.hand.push(randomCard);
      console.log(randomCard);
      //end of drawCard function

    };
    //end of CardPlayer constructor

  };


  introduce() {
    console.log(`Card Player is ${this.name}. Card Play hand includes: ${this.hand}`);
    //end of introduce function
  };

  //end of CardPlayer class
}; //TODO



//CREATE TWO NEW CardPlayers
const dealer = new CardPlayer('Dealer Jane'); // TODO

const player = new CardPlayer('Player John'); // TODO

player.introduce();

dealer.introduce();


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
  //isSoft - boolean - true if there is an Ace in the hand that is being counted as 11 points.  
  //false if the hand has no Aces, or if all Aces are counting as 1 point

  //determine whether the hand is soft
  const isSoft = function (hand) {
    //if every in the hand is not an ace, then the hand is not soft
    if (hand.every((card) => card.displayVal !== 'Ace')) {
      blackJackScore.isSoft = false;
    } else if (hand.some((card) => card.displayVal === 'Ace')) {
      //if some cards are an ace but no card has a value of 11   then hand is not soft
      if (hand.val !== 11) {
        blackJackScore.isSoft = false;
      }
      //if any card has a value of eleven there must be at least one Ace making the hand soft
      else if (hand.val === 11) {
        blackJackScore.isSoft = true;
      }
    }
    //end of isSoft function
    else {
      blackJackScore.isSoft = 'false';
    }
    return (blackJackScore.isSoft);
  };

  //calc the total for the hand
  function blackJackTotal(hand) {

    blackJackScore.total = 0;

    for (let i = 0; i < hand.length; i++) {
      if (hand[i].displayVal === 'Ace' && hand[i].val === 11 && (blackJackScore.total + hand[i].val) > 21) {
        blackJackScore.total += 1;
      } else if (hand[i].displayVal === 'Ace' && hand[i].val === 11 && (blackJackScore.total + hand[i].val) <= 21) {
        blackJackScore.total += hand[i].val;
      } else {
        blackJackScore.total += hand[i].val;
      }
      //end of calcPoints for loop to calc blackJackScore.total
    }

    //end of blackJackTotal function
    return (blackJackScore.total)
  }
  //call the isSOft function

  isSoft(hand);

  //call the blackJackTotal function

  blackJackTotal(hand);

  //return results of the function

  return blackJackScore;

  //end of calPoints function
}

/**
 * Determines whether the dealer should draw another card.
 * 
 * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
 * @returns {boolean} whether dealer should draw another card
 */
// debugger
//TODO
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
//TODO


const determineWinner = (playerScore, dealerScore) => {

  if (dealerScore > 21) {
    return `Player score was ${playerScore}. Dealer Score was ${dealerScore}. Dealer scored more than 21 - Player wins`
  } else if (playerScore <= 21 && (playerScore > dealerScore)) {
    return `Player score was ${playerScore}. Dealer Score was ${dealerScore}. Player wins.`
  } else if (playerScore === dealerScore) {
    return `Player score was ${playerScore}. Dealer Score was ${dealerScore}. Player and Dealer are tied.`
  } else {
    return `Player score was ${playerScore}. Dealer Score was ${dealerScore}. Dealer wins.`
  }

};
// determineWinner(playerScore, dealerScore)

/**DELIVERED CODE STARTS HERE
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

// debugger
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