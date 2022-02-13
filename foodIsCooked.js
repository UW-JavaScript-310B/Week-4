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
  let isOverCooked = false;

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
      } else if (doneness === "rare" && internalTemp >= 135) {
        isCooked = true;
        isOverCooked = true;
      } else if (
        doneness === "medium" &&
        internalTemp >= 135 &&
        internalTemp < 155
      ) {
        isCooked = true;
      } else if (doneness === "medium" && internalTemp >= 155) {
        isCooked = true;
        isOverCooked = true;
      } else if (doneness === "well" && internalTemp >= 155) {
        isCooked = true;
      }
      break;
    default:
      console.log(`${kind} is not a recognized kind of meat.`);
  }

  if (isCooked && !isOverCooked) {
    console.log(`The ${kind} at ${internalTemp} is cooked ${doneness}`);
  } else if (isCooked && isOverCooked) {
    console.log(
      `The ${kind} at ${internalTemp} is over cooked to be ${doneness}`
    );
  } else {
    console.log(`The ${kind} at ${internalTemp} is not cooked ${doneness}`);
  }

  return isCooked;
};

// Test function
console.log(foodIsCooked("chicken", 164)); // should be false
console.log(foodIsCooked("chicken", 165)); // should be true
console.log(foodIsCooked("chicken", 166)); // should be true
console.log(foodIsCooked("beef", 124, "rare")); // should be false
console.log(foodIsCooked("beef", 125, "rare")); // should be true
console.log(foodIsCooked("beef", 135, "rare")); // should be true but over cooked
console.log(foodIsCooked("beef", 136, "rare")); // should be true but over cooked
console.log(foodIsCooked("beef", 134, "medium")); // should be false
console.log(foodIsCooked("beef", 135, "medium")); // should be true
console.log(foodIsCooked("beef", 136, "medium")); // should be true
console.log(foodIsCooked("beef", 154, "medium")); // should be true
console.log(foodIsCooked("beef", 155, "medium")); // should be true
console.log(foodIsCooked("beef", 156, "medium")); // should be true but over cooked
console.log(foodIsCooked("beef", 135, "medium")); // should be true
console.log(foodIsCooked("beef", 138, "medium")); // should be true
console.log(foodIsCooked("beef", 154, "well")); // should be false
console.log(foodIsCooked("beef", 155, "well")); // should be true
console.log(foodIsCooked("beef", 156, "well")); // should be true
