/**
 * Determines whether meat temperature is high enough
 * @param {string} kind 
 * @param {number} internalTemp 
 * @param {string} doneness
 * @returns {boolean} isCooked
 */
const foodIsCooked = function (kind, internalTemp, doneness) {
  // Write function HERE
  if (kind === 'chicken') {
    if (internalTemp >= 165) {
      return (`True - The ${kind}, at ${internalTemp} degrees, is at the correct temperature to be considered done.`)
    } else if (internalTemp < 165) {
      return (`False - ${internalTemp} degrees is not warm enough for the ${kind} to be considered done.`)
    }
  }
  if (kind === 'beef') {
    if ((internalTemp >= 125 && internalTemp < 135) && doneness === 'rare') {
      return (`True - The ${kind} is warm enough to be ${doneness}.`)
    } else if ((internalTemp >= 135 && internalTemp < 155) && doneness === 'medium') {
      return (`True - The ${kind} is warm enough to be ${doneness}.`)
    } else if ((internalTemp >= 135 && internalTemp >= 155) && doneness === 'well') {
      return (`True - The ${kind} is warm enough to be ${doneness}.`)
    } else {
      return (`False - ${internalTemp} degrees is not the correct temperature to be considered ${doneness}.`)
    }
  } else {
    return (`Not Determined - Information for ${kind} is not available.`)
  }
}

// Test function
console.log(foodIsCooked('chicken', 90)); // should be false
console.log(foodIsCooked('chicken', 190)); // should be true
console.log(foodIsCooked('beef', 138, 'well')); // should be false
console.log(foodIsCooked('beef', 138, 'medium')); // should be true
console.log(foodIsCooked('beef', 138, 'rare')); // should be true