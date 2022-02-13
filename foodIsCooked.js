/**
 * Determines whether meat temperature is high enough
 * @param {string} kind
 * @param {number} internalTemp
 * @param {string} doneness
 * @returns {boolean} isCooked
 */
const foodIsCooked = function (kind, internalTemp, doneness) {
  // Write function HERE
  let isCooked = false;

  if (!doneness) {
    doneness = "";
  }

  switch (kind) {
    case "chicken":
      if (internalTemp >= 165) {
        isCooked = true;
      }
      break;
    case "beef":
      if (doneness === "rare" && internalTemp >= 125 && internalTemp < 135) {
        isCooked = true;
      } else if (
        doneness === "medium" &&
        internalTemp >= 135 &&
        internalTemp < 155
      ) {
        isCooked = true;
      } else if (doneness === "well" && internalTemp >= 155) {
        isCooked = true;
      }
      break;
    default:
      console.log(`${kind} is not a recognized kind of meat.`);
  }

  if (isCooked) {
    console.log(`The ${kind} at ${internalTemp} is cooked ${doneness}`);
  } else {
    console.log(`The ${kind} at ${internalTemp} is not cooked ${doneness}`);
  }

  return isCooked;
};

// Test function
console.log(foodIsCooked("chicken", 90)); // should be false
console.log(foodIsCooked("chicken", 190)); // should be true
console.log(foodIsCooked("beef", 138, "well")); // should be false
console.log(foodIsCooked("beef", 138, "medium")); // should be true
console.log(foodIsCooked("beef", 138, "rare")); // should be true << I don't agree wit this being true. 138 is a medium steak.
console.log(foodIsCooked("beef", 160, "well")); // should be true
console.log(foodIsCooked("beef", 127, "rare")); // should be true
