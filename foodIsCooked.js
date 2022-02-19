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
        return ('True');
      } else if (internalTemp < 165) {
        return ('False');
      }
    }

    if (kind === 'beef') {
      if ((internalTemp >= 125 && internalTemp < 135) && doneness === 'rare') {
        return ('True')
      } else if ((internalTemp >= 135 && internalTemp < 155) && doneness === 'medium') {
        return ('True')
      } else if ((internalTemp >= 155) && doneness === 'well') {
        return ('True')

      } else {
        return ('False')
      }
    } else {
      return ('undefined')

    }

  }





    // Test function
    console.log(foodIsCooked('chicken', 90)); // should be false
    console.log(foodIsCooked('chicken', 190)); // should be true
    console.log(foodIsCooked('beef', 138, 'well')); // should be false
    console.log(foodIsCooked('beef', 138, 'medium')); // should be true
    console.log(foodIsCooked('beef', 138, 'rare')); // should be true
  