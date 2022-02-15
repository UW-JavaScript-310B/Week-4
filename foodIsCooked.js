/**
 * Determines whether meat temperature is high enough
 * @param {string} kind 
 * @param {number} internalTemp 
 * @param {string} doneness
 * @returns {boolean} isCooked
 */
const foodIsCooked = function(kind, internalTemp, doneness) {
  // Check if kind is checken or not
  if (kind === 'chicken') {
    // Return true if the internal temp >= 165 and vice versa
    return (internalTemp >= 165);
    // check if kind is beef or not
  } else if (kind === 'beef') {
    if (doneness === 'rare') {
      return (internalTemp >= 125);
    } else if (doneness === 'medium') {
      return (internalTemp >= 135);
    } else if (doneness === 'well') {
      return (internalTemp >= 155);
    }
  }
}

// Test function
console.log(foodIsCooked('chicken', 90)); // should be false
console.log(foodIsCooked('chicken', 190)); // should be true
console.log(foodIsCooked('beef', 138, 'well')); // should be false
console.log(foodIsCooked('beef', 138, 'medium')); // should be true
console.log(foodIsCooked('beef', 138, 'rare')); // should be true