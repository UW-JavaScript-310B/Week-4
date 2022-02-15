const blackjackDeck = getDeck();

/**
 * Represents a card player (including dealer).
 * @constructor
 * @param {string} name - The name of the player
 */
class CardPlayer {
  constructor(name){
    this.name = name;
    this.hand = [];
  }

  drawCard(){
    const randomCard = blackjackDeck[Math.floor(Math.random()*52)];
    return this.hand.push(randomCard);
  };

}; //TODO

// CREATE TWO NEW CardPlayers
const dealer = new CardPlayer('Dealer'); // TODO
const player = new CardPlayer('Player'); // TODO

/**
 * Calculates the score of a Blackjack hand
 * @param {Array} hand - Array of card objects with val, displayVal, suit properties
 * @returns {Object} blackJackScore
 * @returns {number} blackJackScore.total
 * @returns {boolean} blackJackScore.isSoft
 */
const calcPoints = (hand) => {
  // Check if the array of cards has an "Ace"
  const findAce = hand.find((card) => card.displayVal === 'Ace');
  // Define isSoft - "true" if there is an Ace in the hand
  const isSoft = (findAce !== undefined);
  // Calculate the total points of these cards
  let total = 0;

  // If there is an Ace in hand
  if (isSoft) {
    // Filter the other cards that are not "Ace"
    const otherCards = hand.filter((card) => card.displayVal !=='Ace');
    // Looping through this cards array
    otherCards.forEach(other => {
      // Calculate the total of other cards
      total += other.val;
    });
    // Filter Ace cards
    const aceCards = hand.filter((ace) => ace.displayVal === 'Ace');
    // Looping through Ace cards
    aceCards.forEach(aceVal => {
      // Check if the total > 21 or not
      let aceValue = (total + aceVal.val) > 21 ? 1:11
      total += aceValue;
    });

  } else {
    // Looping through the hand array
    hand.forEach((eachCard) => {
      // Calculate the total of all cards in the hand
      total += eachCard.val;
    });
  }
  // Return object blackJackScore
  return blackJackScore = {total,isSoft};
}

/**
 * Determines whether the dealer should draw another card.
 * 
 * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
 * @returns {boolean} whether dealer should draw another card
 */
const dealerShouldDraw = (dealerHand) => {
  // CREATE FUNCTION HERE
  // Get score of dealer hand
  const dealerScore = calcPoints(dealerHand);
  // Check if dealerScore <= 16 or "dealerScore equal 17 and there is an Ace in dealerHand"
  if (dealerScore.total <= 16 || (dealerScore.total === 17 && dealerScore.isSoft)) {
    return true;
  } else {
    return false;
  }
};

/**
 * Define displayHTML function to show info in HTML page
 * @param {string} text
 * @param {string} className (optional)
 */
const displayHTML = (text, className = '') => {
  // Create a new <p> element
  const resultElement = document.createElement('p');
  resultElement.innerHTML = text;
  // Set CSS class for this element if className is given
  if (className !== '') {
    resultElement.className = className;
  }
  // Get element "showHand"
  const showHandElement = document.getElementById('showHand');
  // Add child element
  showHandElement.appendChild(resultElement);
};


/**
 * Determines the winner if both player and dealer stand
 * @param {number} playerScore 
 * @param {number} dealerScore 
 * @returns {string} Shows the player's score, the dealer's score, and who wins
 */
const determineWinner = (playerScore, dealerScore) => {
  // Define winner var
  let winner;
  // Check if who wins
  if (playerScore > dealerScore) {
    winner = `You win!`;
  } else if (playerScore === dealerScore) {
    winner = `You are tied!`
  } else {
    winner = `Dealer wins!`;
  }
  // Show result in HTML page
  const text = `Player score: <span class='approval'>${playerScore}</span>, Dealer score: <span class='warning'>${dealerScore}</span>. <span class='summary'>${winner}</span>`;
  displayHTML(text);
  // Return the final result
  return `Player score: ${playerScore}, Dealer score: ${dealerScore}. ${winner}`
};

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
  console.log( `${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`);

  // Display info in HTML page
  const showHandText = `<span class='approval'>${player.name}'s</span> hand is <span class='approval'>${displayHand.join(', ')}</span> (<span class='title'>${calcPoints(player.hand).total}</span>)`;
  displayHTML(showHandText);
}

/**
 * Runs Blackjack Game
 */
const startGame = function() {
  player.drawCard();
  dealer.drawCard();
  player.drawCard();
  dealer.drawCard();
  // Player part
  let playerScore = calcPoints(player.hand).total;
  showHand(player);

  // If the player gets exactly 21 after drawing her first 2 cards, the player immediately wins
  if (playerScore === 21) {
    // Display in HTML page
    const text = `You get 21 after first 2 cards drawing. You win!`;
    displayHTML(text, 'summary');
    // Return the final result. Game over!
    return text;
  }

  // Dealer part
  let dealerScore = calcPoints(dealer.hand).total;
  // If the dealer draws exactly 21 after drawing her first 2 cards, the dealer immediately wins
  if (dealerScore === 21) {
    showHand(dealer);
    // Display in HTML page
    const text = `Dealer gets 21 after first 2 cards drawing. Dealer wins!`;
    displayHTML(text, 'summary');
    // Return the final result. Game over!
    return text;
  }
  
  // Player continues to draw new card
  while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
    player.drawCard();
    playerScore = calcPoints(player.hand).total;
    showHand(player);
  }

  if (playerScore > 21) {
    // Display this message below in HTML page
    const text = `You went over <span class='title'>21</span> - you lose!`;
    displayHTML(text, 'warning');
    // Game over.
    return 'You went over 21 - you lose!';
  }
  console.log(`Player stands at ${playerScore}`);
  
  // Display player info in HTML page
  const playerInfo = `Player stands at <span class='title'>${playerScore}</span>`;
  displayHTML(playerInfo);

  // Dealer continues to draw new card
  while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
    dealer.drawCard();
    dealerScore = calcPoints(dealer.hand).total;
    showHand(dealer);
  }
  if (dealerScore > 21) {
    // Display this message below in HTML page
    const text = `Dealer went over <span class='warning'>21</span> - you win!`;
    displayHTML(text,'summary');
    // Game over.
    return 'Dealer went over 21 - you win!';
  }
  console.log(`Dealer stands at ${dealerScore}`);

  // Display dealer info in HTML page 
  const dealerInfo = `Dealer stands at <span class='title'>${dealerScore}</span>`;
  displayHTML(dealerInfo);
  // Return the result
  return determineWinner(playerScore, dealerScore);
}
console.log(startGame());