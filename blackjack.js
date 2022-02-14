let playerCards = document.getElementById("playerCards");
let gamePlay = document.getElementById("gamePlay");
let playerStanding = false;

const blackJackDeck = getDeck();

/**
 * Represents a card player (including dealer).
 * @constructor
 * @param {string} name - The name of the player
 */
class CardPlayer {
  constructor(name) {
    this.standing = false;
    this.name = name;
    this.hand = [],
    this.drawCard = () => {
      const randomCard = Math.floor(Math.random() * 52);
      if(blackJackDeck[randomCard].dealt) {
        this.drawCard();
      }
      else {
        blackJackDeck[randomCard].dealt = true;
        this.hand.push(blackJackDeck[randomCard]);
      }
    }
  }
}; //TODO

const dealer = new CardPlayer('Dealer'); // TODO
const player = new CardPlayer('Player'); // TODO

/**
 * Calculates the score of a blackJack hand
 * @param {Array} hand - Array of card objects with val, displayVal, suit properties
 * @returns {Object} blackJackScore
 * @returns {number} blackJackScore.total
 * @returns {boolean} blackJackScore.isSoft
 */
const calcPoints = (hand) => {
  let currentScore = hand.reduce(((previousCard, nextCard) => previousCard + nextCard.val), 0);
  let blackJackScore = {
    total: currentScore,
    isSoft: currentScore < 15 ? true : false
  }
  return blackJackScore;
}

/**
 * Determines the winner if both player and dealer stand
 * @param {number} playerScore 
 * @param {number} dealerScore 
 * @returns {string} Shows the player's score, the dealer's score, and who wins
 */
const determineWinner = (playerScore, dealerScore) => {
  return(playerScore >= dealerScore) ? 'Player wins' : 'Dealer wins';
}

/**
 * Manage dealer game play
 * @returns {string} Confirms deals busts or stands
 */
const dealerPlays = () => {
  let dealerScore = calcPoints(dealer.hand);
  while (dealer.blackJackScore.isSoft) {
    dealer.drawCard();
    dealerScore = calcPoints(dealer.hand);
    showHand(dealer);
  }
  if (dealerScore > 21) {
    outputGamePlay(`Dealer went over 21 - you win!`);
  }
  else {
    outputGamePlay(`Dealer stands at ${dealerScore}`);
  }
}


/**
 * Creates user prompt to ask if they'd like to draw a card
 * @param {number} count 
 * @param {string} dealerCard 
 */
const getMessage = (count, dealerCard) => {
  outputGamePlay(`Dealer showing ${dealerCard.displayVal}, your count is ${count}.  Draw card?`);
  return `Dealer showing ${dealerCard.displayVal}, your count is ${count}.  Draw card?`;
}

/**
 * Logs the player's hand to the console
 * @param {CardPlayer} player 
 */
const showHand = (player) => {
  const displayHand = player.hand.map((card) => `${card.displayVal} of ${card.suit}`);
  console.log(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`);
  outputGamePlay(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`);
  if(player.name === 'Player') {
    playerCards.innerHTML = '';
    player.hand.forEach(card => playerCards.innerHTML += `<span class="card rank-${card.displayVal.toString().toLowerCase()} spades"><span class="rank">${card.displayVal}</span><span class="suit">&${card.dingbat};</span></span>`);
  }
  else if (!playerStanding) {
    dealerCards.innerHTML = `<span id="placeholderCard" class="card back">*</span>`;
    dealerCards.innerHTML += `<span class="card rank-${player.hand[1].displayVal.toString().toLowerCase()} spades"><span class="rank">${player.hand[1].displayVal}</span><span class="suit">&${player.hand[1].dingbat};</span></span>`;
  }
  else {
    dealerCards.innerHTML = '';
    player.hand.forEach(card => dealerCards.innerHTML += `<span class="card rank-${card.displayVal.toString().toLowerCase()} spades"><span class="rank">${card.displayVal}</span><span class="suit">&${card.dingbat};</span></span>`);
  }
}

/**
 * Logs gameplay to browser
 * @returns  
 */
const outputGamePlay = (message) => {
  gamePlay.innerHTML += `<li>${message}</li>`;
}

/**
 * Runs blackJack Game
 */
const startGame = function() {
  player.drawCard();
  dealer.drawCard();
  player.drawCard();
  dealer.drawCard();

  document.getElementById('hit').addEventListener("click", function() {
    player.drawCard();
    playerScore = calcPoints(player.hand).total;
    showHand(player);
  });

  document.getElementById('stand').addEventListener("click", function() { 
    playerStanding = true;
    outputGamePlay(`Player stands at ${playerScore}`);
    showHand(dealer);
    dealerPlays();
  });

  let playerScore = calcPoints(player.hand).total;

  showHand(player);
  showHand(dealer);

  if (playerScore > 21) {
    return 'You went over 21 - you lose!';
  }

  showHand(dealer);

  return determineWinner(calcPoints(player.blackJackScore.total, dealer.blackJackScore.total));
}

console.log('--------------------\nWELCOME TO BLACKJACK\n--------------------');
startGame();
