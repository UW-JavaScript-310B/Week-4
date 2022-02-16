/**
 * Determines whether meat temperature is high enough
 * @param {string} kind 
 * @param {number} internalTemp 
 * @param {string} doneness
 * @returns {boolean} isCooked
 */
const foodIsCooked = function(kind, internalTemp, doneness) {
  // Write function HERE
    switch (kind.toLowerCase()) {
      case ('chicken'):
        return internalTemp > 165;
        break;
        case ('beef'):
          switch (doneness.toLowerCase()) {
            case 'rare':
              return internalTemp > 125;
              case 'medium':
              return internalTemp > 135;
              case 'well':
              return internalTemp > 155;
              break;
          }
  
    }
}



// Test function
console.log(foodIsCooked('chicken', 90)); // should be false
console.log(foodIsCooked('chicken', 190)); // should be true
console.log(foodIsCooked('beef', 138, 'well')); // should be false
console.log(foodIsCooked('beef', 138, 'medium')); // should be true
console.log(foodIsCooked('beef', 138, 'rare')); // should be true