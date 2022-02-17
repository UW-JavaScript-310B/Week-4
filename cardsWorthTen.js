const cards = [
  { val: 2, displayVal: "2", suit: "hearts" },
  { val: 3, displayVal: "3", suit: "hearts" },
  { val: 4, displayVal: "4", suit: "hearts" },
  { val: 5, displayVal: "5", suit: "hearts" },
  { val: 6, displayVal: "6", suit: "hearts" },
  { val: 7, displayVal: "7", suit: "hearts" },
  { val: 8, displayVal: "8", suit: "hearts" },
  { val: 9, displayVal: "9", suit: "hearts" },
  { val: 10, displayVal: "10", suit: "hearts" },
  { val: 10, displayVal: "Jack", suit: "hearts" },
  { val: 10, displayVal: "Queen", suit: "hearts" },
  { val: 10, displayVal: "King", suit: "hearts" },
  { val: 11, displayVal: "Ace", suit: "hearts" }
];
/**
 * Takes an array of cards and returns a string of the card display
 * values where the value is equal to 10
 *
 * @param {array} cards
 * @return {string} displayVal
 */
 const cardsWorthTen = cards => {
   // value to search
  const searchVal = 10;
  //use array filter to return only item where the value is equal to 10
  const arrFilter = cards.filter((item) => item.val == searchVal);
  // use array reduce function to flatten the array
  // and return a string
  let strRet = arrFilter.reduce(
  (accum,index) => `${accum} ${index.displayVal},`)
  // format return string as desired
  strRet = `${searchVal}, ${strRet.slice(0,strRet.length -1)}`;
  //return result string
  return strRet;    
 }
  
console.log(cardsWorthTen(cards));
// should return/log "10, Jack, Queen, King"
