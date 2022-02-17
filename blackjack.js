// start a card deck with 52 cards
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
  
 // draw a random card and add to the player hand array
 drawCard(){
    let randomCard = blackjackDeck[Math.floor(Math.random() * 52)];
    
    this.hand.push(randomCard);
    console.log(this.hand);        
 }
}

// CREATE TWO NEW CardPlayers
const dealer = new CardPlayer('TonyTheDealer'); // TODO
const player = new CardPlayer('JohnnyThePlayer'); // TODO

/**
 * Calculates the score of a Blackjack hand
 * @param {Array} hand - Array of card objects with val, displayVal, suit properties
 * @returns {Object} blackJackScore
 * @returns {number} blackJackScore.total
 * @returns {boolean} blackJackScore.isSoft
 */
const calcPoints = (hand) => {
  // CREATE FUNCTION HERE
  let returnObj = {total: 0, isSoft: false};
  let pointTotal = 0;
  let checkIsSoft = false;
  let aceCount = 0;
  
  //loop through the object card array
  const hd = Object.values(hand);
  
  //loop through array and log every card object
  for (let c of hd)
  {
    //if it is an Ace then increase AceCount by 1  	
    let s = c.displayVal;
    if (s ==='Ace')
    {
    	aceCount = parseInt(aceCount) + 1;
    }
    //if aceCount equal or greater than 2 then set value of Ace card to 1
    // else leave as is
    if (parseInt(aceCount) >= 2)
    {
   		c.val = 1;
    }
    //if pointTotal > 21 and if it is an Ace 
    //and its value is 11 then set its val to 1
    if (parseInt(pointTotal) + parseInt(c.val) > 21 && s === 'Ace' && parseInt(c.val) == 11)
    {
    	c.val = 1;
    }
    //set checkIsSoft to true if there is an Ace card
    // and its value is 11
    if (parseInt(aceCount) == 1 && parseInt(c.val) == 11)
    {
    	checkIsSoft = true;
    }
    //calculate running point total	
    pointTotal = parseInt(pointTotal) + parseInt(c.val);
  }
  
  //setup return object
  returnObj = {total: pointTotal, isSoft: checkIsSoft};
  //return the object
  return returnObj;
}

/**
 * Determines whether the dealer should draw another card.
 * 
 * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
 * @returns {boolean} whether dealer should draw another card
 */
const dealerShouldDraw = (dealerHand) => {
  // CREATE FUNCTION HERE
  // define boolean type return var
  let needAnotherDraw = false;
  //call calcPoints function to get dealer total score and isSoft property value
  const dHand = calcPoints(dealerHand);
  //if the dealer hand is 16 or less, dealer must draw another card
  needAnotherDraw = (dHand.total < 16) ? true : false;
  //if the dealer hand is exactly 17 and the dealer has an Ace value at 11 aka
  // isSoft value is true then the dealer must draw another card
  needAnotherDraw = (dHand.isSoft) ? true : false;
  //Otherwise the dealer hand is 17 or more, the dealer can not draw another card
  // no need to evaluate use default which is false
  return needAnotherDraw;
}
/**
 * Determines the winner if both player and dealer stand
 * @param {number} playerScore 
 * @param {number} dealerScore 
 * @returns {string} Shows the player's score, the dealer's score, and who wins
 */
const determineWinner = (playerScore, dealerScore) => {
  // CREATE FUNCTION HERE
   let rtrStr = "";
   let winner = "";

   //Compare scores between player and dealer and determine the winner or a tie
   // return string with player's score, dealer's score and who wins
   if (parseInt(playerScore) > parseInt(dealerScore))
   {
      winner = "Player";
   }
   else if (parseInt(playerScore) < parseInt(dealerScore)) {
    winner = "Dealer";
   }
   else{
     winner = "Tie";
   }
   rtrStr = `Player Score: ${playerScore}, Dealer Score: ${dealerScore}, Winner: ${winner}`;
   return rtrStr;
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
   
  let logStr = `${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`;
  //log to console
  console.log(logStr);
  // log to browser
  //get the HTML content of the document
  const myBody = document.body.innerHTML;
  //change the <body> of a document 
  document.body.innerHTML = logStr;
}

/**
 * Runs Blackjack Game
 */
const startGame = function() {
  player.drawCard();
  dealer.drawCard();
  player.drawCard();
  dealer.drawCard();
  //boolean to flag quick win - only 2 cards draw and get exactly 21 points
  let isQuickWin = false;
  let playerScore = calcPoints(player.hand).total;
  showHand(player);
  while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
    player.drawCard();
    playerScore = calcPoints(player.hand).total;
    showHand(player);
    //if player play first two cards and total points equals exactly 21
    // no more drawing, exit loop to declare player is the winner
    
    if (player.hand.count == 2 && playerScore == 21)
    {
      isQuickWin = true;
      break;
    }
  
  }
  if (playerScore > 21) {
    return 'You went over 21 - you lose!';
  }
  //exit function to declare player is the winner
  
  else if (isQuickWin)
  {
    return 'Player card total is 21 after 2 draws - Player win';
  }
  
  console.log(`Player stands at ${playerScore}`);

  let dealerScore = calcPoints(dealer.hand).total;
  while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
    dealer.drawCard();
    dealerScore = calcPoints(dealer.hand).total;
    showHand(dealer);
    //if dealer play first two cards and total points equals exactly 21
    // no more drawing, exit loop to declare dealer is the winner
    
    if (dealer.hand.count == 2 && dealerScore == 21)
    {
      isQuickWin = true;
      break;
    }
  
  }
  if (dealerScore > 21) {
    return 'Dealer went over 21 - you win!';
  }
   //exit function to declare dealer is the winner
  
  else if (isQuickWin)
  {
     return 'Dealer card total is 21 after 2 draws - Dealer win';
  }
  
  console.log(`Dealer stands at ${dealerScore}`);

  return determineWinner(playerScore, dealerScore);
}
console.log(startGame());