
const blackjackDeck = getDeck();

/**
 * Represents a card player (including dealer).
 * @constructor
 * @param {string} name - The name of the player
 */
class CardPlayer {

  hand;

  constructor(name) {
    this.name = name
    this.hand = []
  }

  drawCard(){

    let randomElement = blackjackDeck[Math.floor(Math.random()*blackjackDeck.length)]

    console.log(randomElement)

    this.hand.push(randomElement)

    console.log(this.hand)

  }

} //TODO

// CREATE TWO NEW CardPlayers

const dealer = new CardPlayer('Dealer');
const player = new CardPlayer('Player');

/**
 * Calculates the score of a Blackjack hand
 * @param {Array} hand - Array of card objects with val, displayVal, suit properties
 * @returns {Object} blackJackScore
 * @returns {number} blackJackScore.total
 * @returns {boolean} blackJackScore.isSoft
 */
const calcPoints = (hand) => {
  let total_=0
  let isSoft=false
  // let tot = 0
  // let countOne=0
  let countEleven=0

  // CREATE FUNCTION HERE
  for (let thing in hand){

    // console.log(hand[thing]['val'])

    total_+=hand[thing]['val']

  }

  let count = 0

  for (let thing in hand){

    if (hand[thing]['displayVal']==='ace'){
      count+=1
    }

  }

  if (total_>21 && count === 1){

    const index = hand.findIndex(element=> element.displayVal === 'ace')

    hand[index]['val']=1

  } else if (total_>21 && count>1){

    for (let thing in hand){

      if (hand[thing]['val']=== 11){

        hand[thing]['val']=1

      }

    }

  }

  for (let thing in hand){

    if (hand[thing]['displayVal']==='ace' && hand[thing]['val']===11){
      countEleven +=1
    }

  }


  if (count===0){
    isSoft = false
  }else if (countEleven !==0){
    isSoft = false
  }else if (countEleven >= 1){
    isSoft = true
  }

  //console.log(total_)
  // console.log(isSoft)

  return {
    total:total_,
    isSoft,
  }

}

/**
 * Determines whether the dealer should draw another card.
 *
 * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
 * @returns {boolean} whether dealer should draw another card
 */
const dealerShouldDraw = (dealerHand) => {
  // CREATE FUNCTION HERE

  let shouldDraw = true

  let totalPoints_ = calcPoints(dealerHand).total;

  console.log(totalPoints_)

  let isSoft_ = calcPoints(dealerHand).isSoft;

  console.log(`is soft ${isSoft_}`)

  return shouldDraw

}

/**
 * Determines the winner if both player and dealer stand
 * @param {number} playerScore
 * @param {number} dealerScore
 * @returns {string} Shows the player's score, the dealer's score, and who wins
 */
const determineWinner = (playerScore, dealerScore) => {
  // CREATE FUNCTION HERE
  let winner =""
  console.log(playerScore)
  console.log(dealerScore)
  console.log(winner)
  if (playerScore === dealerScore){
    winner="it is a tie!"

  } else if (playerScore>dealerScore){
    winner="player"
  } else {
    winner ="dealer"
  }

  // console.log(`playerScore is ${playerScore}, dealerScore is ${dealerScore}, winner is ${winner}`)
  return `playerScore is ${playerScore}, dealerScore is ${dealerScore}, winner is ${winner}`

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
  // let whatever = calcPoints(player.hand).isSoft;
  // console.log(`whatever ${whatever}`)
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

  // code below does not execute because a return happens before getting here

  return determineWinner(playerScore, dealerScore);

}
console.log(startGame());

