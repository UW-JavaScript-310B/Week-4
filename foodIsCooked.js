/**
 * Determines whether meat temperature is high enough
 * @param {string} kind 
 * @param {number} internalTemp 
 * @param {string} doneness
 * @returns {boolean} isCooked
 */
const foodIsCooked = function(kind, internalTemp, doneness) {
  if (kind === 'chicken' && internalTemp >= 165)
  {
      return true
  }
  if (kind === 'beef')
  {
      if ((doneness === 'rare' && internalTemp >= 125)
           || (doneness === 'medium' && internalTemp >= 135)
            || (doneness === 'well' && internalTemp >= 155))
      {
          return true;
      }
  }
  return false;
}



// Test function
console.log(foodIsCooked('chicken', 90)); // should be false
console.log(foodIsCooked('chicken', 190)); // should be true
console.log(foodIsCooked('beef', 138, 'well')); // should be false
console.log(foodIsCooked('beef', 138, 'medium')); // should be true
console.log(foodIsCooked('beef', 138, 'rare')); // should be true