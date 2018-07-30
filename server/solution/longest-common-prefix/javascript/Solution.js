var longestCommonPrefix = function(strs) {
  // Initializes the result
  let result = "";

  // Validates the parameter
  if (!strs || strs.length === 0) {
    return result;
  }

  // Copies the array of strings because we will change the original array (This is optional)
  const strings = strs;

  // Gets the first string of the array
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift
  const firstStr = strings.shift();

  // Initializes the index and the index value
  let index = 1;
  let indexVal = "";

  // Loops over the the rest of the array
  // The loop breaks when the index moves to the end of the first string or a different charecter is found
  while (true) {
    // Gets the character of the first string by index
    indexVal = firstStr.charAt(index);

    // Checks if all the strings have the same character at same index
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
    if (
      indexVal === "" ||
      !strings.every(str => indexVal === str.charAt(index))
    ) {
      break;
    } else {
      // Adds the index value to the result
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
      result = result.concat(indexVal);

      // Increases the index
      index++;
    }
  }

  return result;
};

module.exports = longestCommonPrefix;
