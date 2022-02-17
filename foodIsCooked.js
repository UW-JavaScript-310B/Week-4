/**
 * Determines whether meat temperature is high enough
 * @param {string} kind 
 * @param {number} internalTemp 
 * @param {string} doneness
 * @returns {boolean} isCooked
 */
 const foodIsCooked = function(kind, internalTemp, doneness) {
  // Write function HERE
  //check for chicken
  if (kind.toLowerCase() ==='chicken')
  {
    return internalTemp > 165;
  }
  //check for beef
  else if (kind.toLowerCase() ==='beef')
  {
  //if rare
    if (doneness.toLowerCase() ==='rare'){
      return internalTemp > 125;
    }
    //if medium
    else if (doneness.toLowerCase() ==='medium')
    {
      return internalTemp > 135;
    }
    //if well
    else if (doneness.toLowerCase() ==='well')
    {
      return internalTemp > 155;
    } 
  }
  // other cases
  else return false;
}



// Test function
console.log(foodIsCooked('chicken', 90)); // should be false
console.log(foodIsCooked('chicken', 190)); // should be true
console.log(foodIsCooked('beef', 138, 'well')); // should be false
console.log(foodIsCooked('beef', 138, 'medium')); // should be true
console.log(foodIsCooked('beef', 138, 'rare')); // should be true