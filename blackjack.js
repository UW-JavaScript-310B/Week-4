let playerCards = document.getElementById("playerCards");
let gamePlay = document.getElementById("gamePlay");

const blackJackDeck = getDeck();

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

  playerStanding = false;

  drawCard() {
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

  let blackJackScore = {
    total: currentScore,
    isSoft: false
  }

  if(currentScore < 21 && hand.some(card => card.val == 11)) {
    blackJackScore.isSoft = true;
  }
  else if(currentScore > 21 && hand.some(card => card.val == 11)) {
    hand.find(card => card.val == 11).val = 1;
    blackJackScore.total = hand.reduce(((previousCard, nextCard) => previousCard + nextCard.val), 0);
  }
  else if(currentScore > 21) {
    endGame();
  }

  return blackJackScore;
}

/**
 * Determines whether the dealer should draw another card.
 * 
 * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
 * @returns {boolean} whether dealer should draw another card
 */
const dealerShouldDraw = (dealer) => {
  return ((calcPoints(dealer.hand).total <= 16) || (calcPoints(dealer.hand).isSoft && calcPoints(dealer.hand).total === 17));
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
    player.hand.forEach(card => playerCards.innerHTML += `<span class="card rank-${card.displayVal.toString().toLowerCase()} ${card.dingbat}"><span class="rank">${card.displayVal}</span><span class="suit">&${card.dingbat};</span></span>`);
  }
  if(player.name == 'Dealer') {
    if(!player.playerStanding) {
      dealerCards.innerHTML = `<span id="placeholderCard" class="card back">*</span>`;
      dealerCards.innerHTML += `<span class="card rank-${player.hand[1].displayVal.toString().toLowerCase()} ${player.hand[1].dingbat}"><span class="rank">${player.hand[1].displayVal}</span><span class="suit">&${player.hand[1].dingbat};</span></span>`;  
    }
    else {
      outputGamePlay(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`);
      dealerCards.innerHTML = '';
      player.hand.forEach(card => dealerCards.innerHTML += `<span class="card rank-${card.displayVal.toString().toLowerCase()} ${card.dingbat}"><span class="rank">${card.displayVal}</span><span class="suit">&${card.dingbat};</span></span>`);  
    }
  }
}

/**
 * Logs gameplay to browser
 */
const outputGamePlay = (message) => {
  gamePlay.innerHTML += `<li>${message}</li>`;
}

/**
 * Determines the winner if both player and dealer stand
 * @param {number} player
 * @param {number} dealer
 * @returns {string} Shows the player's score, the dealer's score, and who wins
 */
const determineWinner = (player, dealer) => {
  if(calcPoints(player.hand).total > 21) return 'Dealer wins';
  else if(calcPoints(dealer.hand).total > 21) return 'Player wins';
  else if(calcPoints(player.hand).total === calcPoints(dealer.hand).total) {
    if((dealer.hand[0].val == 10 && dealer.hand[1].displayVal == 'A') || (dealer.hand[0].displayVal == 'A' && dealer.hand[1].val == 10)) {
      return 'Dealer wins.';
    }
    return 'No winner. Push.';
  }
  return(calcPoints(player.hand).total >= calcPoints(dealer.hand).total) ? 'Player wins' : 'Dealer wins';
}

/**
 * Ends game by replacing "Hit" and "Stand" buttons with "New Game" button
 */
const endGame = () => {
  document.getElementById('col').innerHTML = '<button id="new">New Game</button>';
  document.getElementById('new').addEventListener("click", startGame);
}

/**
 * Runs blackJack Game
 */
const startGame = () => {
  document.getElementById('gamePlay').innerHTML = '';
  document.getElementById('col').innerHTML = '<button id="hit">Hit</button><button id="stand">Stand</button>';

  const dealer = new CardPlayer('Dealer', blackJackDeck); // TODO
  const player = new CardPlayer('Player', blackJackDeck); // TODO

  player.drawCard();
  dealer.drawCard();
  player.drawCard();
  dealer.drawCard();

  showHand(player);
  showHand(dealer);

  if(naturalBlackjack(player)) {
    outputGamePlay(determineWinner(player, dealer));
    endGame();
  }
  else {
    let hit = () => {
      player.drawCard();
      showHand(player);
      if (calcPoints(player.hand).total === 21) {
        stand();
      }
      else if(calcPoints(player.hand).total > 21) {
        outputGamePlay(`Player busts`);
        outputGamePlay(determineWinner(player, dealer));
        endGame();
      }
    };
  
    document.getElementById('hit').addEventListener("click", hit);
    
    let stand = () => { 
      dealer.playerStanding = true;
      outputGamePlay(`Player stands at ${calcPoints(player.hand).total}`);
      showHand(dealer);

      while(dealerShouldDraw(dealer)) {
        dealer.drawCard();
        dealerScore = calcPoints(dealer.hand).total;
        showHand(dealer);
      }

      if(calcPoints(dealer.hand).total > 21) {
        outputGamePlay(`Dealer busts`);
      }
      else {
        outputGamePlay(`Dealer stands at ${calcPoints(dealer.hand).total}`);
      }

      outputGamePlay(determineWinner(player, dealer));
      endGame();
    };
  
    document.getElementById('stand').addEventListener("click", stand)  
  }
}

startGame();
