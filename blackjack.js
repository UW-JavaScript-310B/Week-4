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
    //debugger;

    const deck = getDeck();
    const randomCard = deck[Math.floor(Math.random() * 52)];
    //const randomCard = deck[0]; //pull Aces
    this.hand.push(randomCard);
  }
}

// CREATE TWO NEW CardPlayers
const dealer = new CardPlayer("dealer");
const player = new CardPlayer(prompt("Please enter your name:", "player 1"));

/**
 * Calculates value of hand
 * @param {Array} hand - Array of card objects with val, displayVal, suit properties
 * @param {Object} blackJackScore
 */
function countHand(hand, blackJackScore) {
  for (card of hand) {
    blackJackScore.total += card.val;
  }

  return blackJackScore.total;
}

/**
 * Checks if hand is soft
 * @param {Array} hand - Array of 90card objects with val, displayVal, suit properties
 * @param {Object} blackJackScore
 */
function checkSoft(hand, blackJackScore) {
  //Check if it is soft
  let filteredAces = hand.filter(
    (card) =>
      (card.displayVal.toString().toLowerCase() === "ace") & (card.val === 11)
  );
  //debugger;
  if (filteredAces.length === 1) {
    blackJackScore.isSoft = true;
  } else if (filteredAces.length >= 2) {
    for (let index = 1; index < filteredAces.length; index++) {
      filteredAces[index].val = 1;
    }
    blackJackScore.isSoft = true;
  }
  return blackJackScore.isSoft;
}

/**
 * Calculates the score of a Blackjack hand
 * @param {Array} hand - Array of card objects with val, displayVal, suit properties
 * @returns {Object} blackJackScore
 * @returns {number} blackJackScore.total
 * @returns {boolean} blackJackScore.isSoft
 */
const calcPoints = (hand) => {
  //cant use blackJackScore variable
  const blackJackScore = { total: 0, isSoft: false };
  let total = 0;
  let isSoft = false;
  checkSoft(hand, blackJackScore);
  countHand(hand, blackJackScore);
  hand.forEach((card) => {
    console.log(card.displayVal);
  });
  console.log(
    `total = ${blackJackScore.total}, isSoft = ${blackJackScore.isSoft}`
  );
  //This seems wrong but it is working correctly. TODO refactor this
  total = blackJackScore.total;
  isSoft = blackJackScore.isSoft;
  return { total, isSoft };
};

/**
 * Determines whether the dealer should draw another card.
 *
 * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
 * @returns {boolean} whether dealer should draw another card
 */
const dealerShouldDraw = (dealerHand) => {
  // CREATE FUNCTION HERE
  // If the dealer's hand is 16 points or less, the dealer must draw another card
  // If the dealer's hand is exactly 17 points, and the dealer has an Ace valued at 11, the dealer must draw another card
  // Otherwise if the dealer's hand is 17 points or more, the dealer will end her turn
  if (countHand(dealerHand) < 16) {
    return true;
  } else if (countHand(dealerHand) === 17 && dealerHand.isSoft) {
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
  if ((playerScore = dealerScore)) {
    return `Player and dealer both have ${playerScore}. This is a tie.`;
  } else if (playerScore > dealerScore) {
    return `Player has ${playerScore} and dealer has ${dealerScore}. Player wins.`;
  } else {
    return `Player has ${playerScore} and dealer has ${dealerScore}. Dealer wins.`;
  }
};

/**
 * Creates user prompt to ask if they'd like to draw a card
 * @param {number} count
 * @param {string} dealerCard
 */
const getMessage = (count, dealerCard) => {
  return `Dealer showing ${dealerCard.displayVal}, your count is ${count}.  Draw card?`;
};

/**
 * Logs the player's hand to the console
 * @param {CardPlayer} player
 */
const showHand = (player) => {
  const displayHand = player.hand.map((card) => card.displayVal);
  console.log(
    `${player.name}'s hand is ${displayHand.join(", ")} (${
      calcPoints(player.hand).total
    })`
  );
};

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
    return "You went over 21 - you lose!";
  }
  console.log(`Player stands at ${playerScore}`);

  let dealerScore = calcPoints(dealer.hand).total;
  while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
    dealer.drawCard();
    dealerScore = calcPoints(dealer.hand).total;
    showHand(dealer);
  }
  if (dealerScore > 21) {
    return "Dealer went over 21 - you win!";
  }
  console.log(`Dealer stands at ${dealerScore}`);

  return determineWinner(playerScore, dealerScore);
};
console.log(startGame());
