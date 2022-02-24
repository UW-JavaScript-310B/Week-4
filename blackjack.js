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

  drawCard() {
    const card = blackjackDeck[Math.floor(Math.random() * 52)];
    this.hand.push(card);
  }
}; 

// CREATE TWO NEW CardPlayers
let dealer = new CardPlayer('Dealer'); 
//dealer.drawCard();
let player = new CardPlayer('Player'); 
//player.drawCard();

/**
 * Calculates the score of a Blackjack hand
 * @param {Array} hand - Array of card objects with val, displayVal, suit properties
 * @returns {Object} blackJackScore
 * @returns {number} blackJackScore.total
 * @returns {boolean} blackJackScore.isSoft
 */
const calcPoints = (hand) => { //hand = [{val: 10, displayVal: "10", suit: "hearts"}, ... ] 
  let blackJackScore = {total: 0, isSoft: false};
  let counter = 0; 
  let lastAce = 0;

  hand.forEach(card => {
    if (card.val < 11 && blackJackScore.isSoft === false) {
      blackJackScore.total += card.val; 
    } else if (card.val < 11 && blackJackScore.isSoft === true) {
      if ((blackJackScore.total + card.val) <= 21) {
        blackJackScore.total += card.val;
      } else if ((blackJackScore.total + card.val) > 21) {
        blackJackScore.total += card.val - 10;
        blackJackScore.isSoft = false;
        //player.hand[lastAce].val = 1;
      }
    } else if (card.val === 11 && blackJackScore.isSoft === false) {
      if ((blackJackScore.total + 11) <= 21) {
        blackJackScore.total += 11;
        blackJackScore.isSoft = true; 
        //lastAce = counter; 
      } else if ((blackJackScore.total + 11) > 21) {
        blackJackScore.total += 1; 
        //player.hand[counter].val = 1;
      }
    } else if (card.val === 11 && blackJackScore.isSoft === true) {
      if ((blackJackScore.total + 1) <= 21) {
        blackJackScore.total += 1; 
        //player.hand[counter].val = 1;
      } else if ((blackJackScore.total + 1) > 21) {
        blackJackScore.total -= 9; 
        blackJackScore.isSoft = false; 
        //player.hand[counter].val = 1;
        //player.hand[lastAce].val = 1;
      }
    }
    counter++;
  })
  return blackJackScore;
}

// player.drawCard();
// console.log(player.hand[0].val);
// player.drawCard();
// console.log(player.hand[1].val);
// player.drawCard();
// console.log(player.hand[2].val);
// player.drawCard();
// console.log(player.hand[3].val);
// console.log(calcPoints(player.hand));
// console.log(calcPoints([{val: 0},{val: 0},{val: 1},{val: 11}]));

/**
 * Determines whether the dealer should draw another card.
 * 
 * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
 * @returns {boolean} whether dealer should draw another card
 */
const dealerShouldDraw = (dealerHand) => { // {total: 0, isSoft: false};
  const hand = calcPoints(dealerHand);
  return (hand.total < 17) ? true: false;
}

/**
 * Determines the winner if both player and dealer stand
 * @param {number} playerScore 
 * @param {number} dealerScore 
 * @returns {string} Shows the player's score, the dealer's score, and who wins
 */
const determineWinner = (playerScore, dealerScore) => {
  let winStr = 
  `Player Score: ${playerScore}<br>Dealer Score: ${dealerScore}<br>`;
  if (playerScore > dealerScore) {
    winStr += `Player Wins!`
  } else if (playerScore < dealerScore) {
    winStr += `Dealer Wins!`
  } else if (playerScore === dealerScore) {
    winStr += `It's a tie!`
  }
  return winStr;
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
  document.write(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total}) <br>`);
  console.log(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total}) \n`);
}

/**
 * Runs Blackjack Game
 */
const startGame = function() {
  let playerCounter = 2;
  let dealerCounter = 2; 
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
    playerCounter++;
  }
  if (playerScore > 21) {
    return '<br>You went over 21 - you lose!<br>';
  } else if (playerScore === 21 && playerCounter === 2) {
    return '<br>You have exactly 21 - you win!<br>';
  }
  document.write(`Player stands at ${playerScore}<br><br>`);
  console.log(`Player stands at ${playerScore}\n`);

  let dealerScore = calcPoints(dealer.hand).total;
  while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
    dealer.drawCard();
    dealerScore = calcPoints(dealer.hand).total;
    showHand(dealer);
    dealerCounter++;
  }
  if (dealerScore > 21) {
    return '<br>Dealer went over 21 - you win!<br>';
  } else if (dealerScore === 21 && dealerCounter === 2) {
    return '<br>Dealer has exactly 21 - Dealer wins!<br>';
  }
  document.write(`Dealer stands at ${dealerScore}<br><br>`);
  console.log(`Dealer stands at ${dealerScore}\n`);

  return determineWinner(playerScore, dealerScore);
}
const consoleLog = document.write(startGame());
console.log(consoleLog); //unfortunately doesn't work