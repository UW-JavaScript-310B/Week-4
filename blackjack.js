let playerCards = document.getElementById("playerCards");
let gamePlay = document.getElementById("gamePlay");

/**
 * Represents a card player (including dealer).
 * @constructor
 * @param {string} name - The name of the player
 */
class CardPlayer {
  constructor(name, blackJackDeck) {
    this.playerStanding = false;
    this.name = name;
    this.hand = [],
    this.drawCard = () => {
      if(!this.standing) {
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
  }
};

/**
 * Determines if player was dealt natural blackjack
 * @param {*} player 
 * @returns {boolean} whether player was dealt natural blackjack
 */
const naturalBlackjack = (player) => {
  return(player.hand[0].val == 10 && player.hand[1].displayVal == 'A') || (player.hand[0].displayVal == 'A' && player.hand[1].val == 10);
}

/**
 * Calculates the score of a blackJack hand
 * @param {Array} hand - Array of card objects with val, displayVal, suit properties
 * @returns {Object} blackJackScore
 * @returns {number} blackJackScore.total
 * @returns {boolean} blackJackScore.isSoft
 */
const calcPoints = (hand) => {
  let currentScore = hand.reduce(((previousCard, nextCard) => previousCard + nextCard.val), 0);

  if(currentScore > 21 && hand.some(card => card.val == 11)) {
    hand.find(card => card.val == 11).val = 1;
    currentScore = hand.reduce(((previousCard, nextCard) => previousCard + nextCard.val), 0);
  }
  else if(currentScore > 21) {
    endGame();
  }

  let blackJackScore = {
    total: currentScore,
    isSoft: currentScore < 15 ? true : false
  }
  return blackJackScore;
}

/**
 * Manage dealer game play
 * @returns {string} Confirms deals busts or stands
 */
const dealerPlays = (dealer) => {
  while (calcPoints(dealer.hand).isSoft) {
    dealer.drawCard();
    dealerScore = calcPoints(dealer.hand).total;
    showHand(dealer);
  }
  // if (calcPoints(dealer.hand).total > 21) {
  //   outputGamePlay(`Dealer went over 21 - you win!`);
  // }
  // else {
  //   outputGamePlay(`Dealer stands at ${calcPoints(dealer.hand).total}`);
  // }

  endGame();
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

  if(player.name == 'Player') {
    outputGamePlay(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`);
    playerCards.innerHTML = '';
    player.hand.forEach(card => playerCards.innerHTML += `<span class="card rank-${card.displayVal.toString().toLowerCase()} spades"><span class="rank">${card.displayVal}</span><span class="suit">&${card.dingbat};</span></span>`);

  }
  if(player.name == 'Dealer') {
    if(!player.playerStanding) {
      dealerCards.innerHTML = `<span id="placeholderCard" class="card back">*</span>`;
      dealerCards.innerHTML += `<span class="card rank-${player.hand[1].displayVal.toString().toLowerCase()} spades"><span class="rank">${player.hand[1].displayVal}</span><span class="suit">&${player.hand[1].dingbat};</span></span>`;  
    }
    else {
      outputGamePlay(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`);
      dealerCards.innerHTML = '';
      player.hand.forEach(card => dealerCards.innerHTML += `<span class="card rank-${card.displayVal.toString().toLowerCase()} spades"><span class="rank">${card.displayVal}</span><span class="suit">&${card.dingbat};</span></span>`);  
    }
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
 * Determines the winner if both player and dealer stand
 * @param {number} playerScore 
 * @param {number} dealerScore 
 * @returns {string} Shows the player's score, the dealer's score, and who wins
 */
const determineWinner = (player, dealer) => {
  if(calcPoints(player.hand).total > 21) return 'Dealer wins';
  else if(calcPoints(dealer.hand).total > 21) return 'Player wins';
  else if(calcPoints(player.hand).total === calcPoints(dealer.hand).total) return 'No winner. Push.';
  
  return(calcPoints(player.hand).total >= calcPoints(dealer.hand).total) ? 'Player wins' : 'Dealer wins';
}

const endGame = () => {
  document.getElementById('col').innerHTML = '<button id="new">New Game</button>';
  document.getElementById('new').addEventListener("click", startGame);
}

/**
 * Runs blackJack Game
 */
//const startGame = function() {
const startGame = () => {
  document.getElementById('gamePlay').innerHTML = '';
  document.getElementById('col').innerHTML = '<button id="hit">Hit</button><button id="stand">Stand</button>';
  const blackJackDeck = getDeck();

  const dealer = new CardPlayer('Dealer', blackJackDeck); // TODO
  const player = new CardPlayer('Player', blackJackDeck); // TODO

  player.drawCard();
  dealer.drawCard();
  player.drawCard();
  dealer.drawCard();

  showHand(player);
  showHand(dealer);

  if(naturalBlackjack(player)) {
    console.log('natuarl bj');
    outputGamePlay(determineWinner(player, dealer));
    endGame();
  }
  else {
    let hit = () => {
      player.drawCard();
      showHand(player);
      if(calcPoints(player.hand).total > 21) {
        outputGamePlay(determineWinner(player, dealer));
        endGame();
      }
      else {
        showHand(player);
      }
    };
  
    document.getElementById('hit').addEventListener("click", hit);
    
    let stand = () => { 
      dealer.playerStanding = true;
      outputGamePlay(`Player stands at ${playerScore}`);
      showHand(dealer);
      dealerPlays(dealer);

      outputGamePlay(`Dealer stands at ${calcPoints(dealer.hand).total}`);

     // if (calcPoints(dealer.hand).total > 21) {
        outputGamePlay(determineWinner(player, dealer));
     // }
     //else {
      //  outputGamePlay(`Dealer stands at ${calcPoints(dealer.hand).total}`);
     // }
    };
  
    document.getElementById('stand').addEventListener("click", stand)  
  }

  let playerScore = calcPoints(player.hand).total;
}

startGame();
