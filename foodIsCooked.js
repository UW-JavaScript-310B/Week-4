/**
 * Determines whether meat temperature is high enough
 * @param {string} kind 
 * @param {number} internalTemp 
 * @param {string} doneness
 * @returns {boolean} isCooked
 */
const foodIsCooked = function(kind, internalTemp, doneness) {

    return (kind === 'chicken' && internalTemp > 165) ||
        (kind === 'beef' && doneness === 'rare' && internalTemp > 125) ||
        (kind === 'beef' && doneness === 'medium' && internalTemp > 135) ||
        (kind === 'beef' && doneness === 'well' && internalTemp > 155);

}



// Test function
console.log(foodIsCooked('chicken', 90)); // should be false
console.log(foodIsCooked('chicken', 190)); // should be true
console.log(foodIsCooked('beef', 138, 'well')); // should be false
console.log(foodIsCooked('beef', 138, 'medium')); // should be true
console.log(foodIsCooked('beef', 138, 'rare')); // should be true