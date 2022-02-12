/**
 * Determines whether meat temperature is high enough
 * @param {string} kind 
 * @param {number} internalTemp 
 * @param {string} doneness
 * @returns {boolean} isCooked
 */
const foodIsCooked = function(kind, internalTemp, doneness) {
  if (kind === 'chicken') {
    return internalTemp >= 165
  } else if (kind === 'beef' && doneness === "well") {
    return internalTemp >= 155
  } else if (kind === 'beef' && doneness === 'medium') {
    return internalTemp >= 135
  } else if (kind === 'beef' && doneness === 'rare') {
    return internalTemp >= 125;
  }
  return error;
}

// Test function
console.log(foodIsCooked('chicken', 90)); // should be false
console.log(foodIsCooked('chicken', 190)); // should be true
console.log(foodIsCooked('beef', 138, 'well')); // should be false
console.log(foodIsCooked('beef', 138, 'medium')); // should be true
console.log(foodIsCooked('beef', 138, 'rare')); // should be true