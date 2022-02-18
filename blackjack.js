const blackjackDeck = getDeck();

/**
 * Represents a card player (including dealer).
 * @constructor
 * @param {string} name - The name of the player
 */
class CardPlayer {
  hand;

  constructor (name)
  {
    this.name = name
    this.hand = []
  }
  drawCard ()
  {
    this.hand.push(blackjackDeck[Math.floor(Math.random() * 52)])
  }
}; //TODO

// CREATE TWO NEW CardPlayers
const dealer = new CardPlayer("Dealer"); // TODO
const player = new CardPlayer("Bob");// TODO

/**
 * Calculates the score of a Blackjack hand
 * @param {Array} hand - Array of card objects with val, displayVal, suit properties
 * @returns {Object} blackJackScore
 * @returns {number} blackJackScore.total
 * @returns {boolean} blackJackScore.isSoft
 */
const calcPoints = (hand) => {
  let blackJackScore = {total: 0, isSoft: true}
  let aceCount = 0;
  for (let card of hand)
  {
    if (card.displayVal !=  'Ace' )
    {
      blackJackScore.total += card.val;
    }
    else
    {
      aceCount++
    }
  }
  if (aceCount > 0)
  {
    if (aceCount > 1)
    {
      if (blackJackScore.total <= (21 - 11 - (aceCount - 1)))
      {
        blackJackScore.total += 11 + aceCount - 1
        blackJackScore.isSoft = true;
      }
      else
      {
        blackJackScore.total += aceCount
      }
    }
    else
    {
     if (blackJackScore.total + 11 <= 21)
     {
       blackJackScore.total += 11;
       blackJackScore.isSoft = true;
     }
     else
     {
       blackJackScore.total++;
     }
    }

  }
  return blackJackScore;
}

/**
 * Determines whether the dealer should draw another card.
 * 
 * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
 * @returns {boolean} whether dealer should draw another card
 */
const dealerShouldDraw = (dealerHand) => {
  let blackJackScore = calcPoints(dealerHand)
  return !!(blackJackScore.total <= 16 || (blackJackScore.total === 17 && blackJackScore.isSoft));

}

/**
 * Determines the winner if both player and dealer stand
 * @param {number} playerScore 
 * @param {number} dealerScore 
 * @returns {string} Shows the player's score, the dealer's score, and who wins
 */
const determineWinner = (playerScore, dealerScore) => {
  let winner = ''
  if (playerScore <= 21 && playerScore === dealerScore)
  {
    winner = 'tied'
  }
  else if (playerScore <= 21 && playerScore > dealerScore)
  {
    winner = 'player'
  }
  else
  {
    winner = 'dealer'
  }
  return `${playerScore} ${dealerScore} ${winner}`

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
const startGame = function() {
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