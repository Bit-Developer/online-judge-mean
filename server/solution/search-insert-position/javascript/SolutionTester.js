const path = require("path");
const fs = require("fs");
const searchInsert = require("./Solution.js");

// read test case from file
const file = path.resolve(__dirname, "testcase.txt");
const data = fs.readFileSync(file);
//console.log(data.toString());
const lines = data.toString().split("\n");
//console.log(lines);
var testcases = [];
for (let i = 0; i < lines.length; i = i + 3) {
  // convert string to number with map(Number)
  let nums = null;
  if (lines[i] !== "null") {
    nums = lines[i]
      .substring(1, lines[i].length - 1)
      .split(",")
      .map(Number);
  }
  let target = parseInt(lines[i + 1], 10);
  let expected = lines[i + 2];

  testcases.push({ nums, target, expected });
  //console.log(testcase);
}

let testresult = true;
for (let i = 0; i < testcases.length; i++) {
  const testcase = testcases[i];
  //console.log(testcase);
  var result = searchInsert(testcase.nums, testcase.target);
  //console.log("result:", result);
  //console.log("testcase.expected:", testcase.expected);
  if (testcase.expected != result) {
    const message =
      "[Fail][" +
      testcase.nums +
      "]," +
      testcase.target +
      ";[" +
      result +
      "];" +
      testcase.expected;
    testresult = false;
    console.log(message);
    break;
  }
}

if (testresult) {
  const message =
    "[Success]Your solution passed all " + testcases.length + " test cases!";
  console.log(message);
}

function isEqual(value, other) {
  // Get the value type
  var type = Object.prototype.toString.call(value);

  // If the two objects are not the same type, return false
  if (type !== Object.prototype.toString.call(other)) return false;

  // If items are not an object or array, return false
  if (["[object Array]", "[object Object]"].indexOf(type) < 0) return false;

  // Compare the length of the length of the two items
  var valueLen =
    type === "[object Array]" ? value.length : Object.keys(value).length;
  var otherLen =
    type === "[object Array]" ? other.length : Object.keys(other).length;
  if (valueLen !== otherLen) return false;

  // Compare two items
  var compare = function(item1, item2) {
    // Get the object type
    var itemType = Object.prototype.toString.call(item1);

    // If an object or array, compare recursively
    if (["[object Array]", "[object Object]"].indexOf(itemType) >= 0) {
      if (!isEqual(item1, item2)) return false;
    } else {
      // Otherwise, do a simple comparison
      // If the two items are not the same type, return false
      if (itemType !== Object.prototype.toString.call(item2)) return false;

      // Else if it's a function, convert to a string and compare
      // Otherwise, just compare
      if (itemType === "[object Function]") {
        if (item1.toString() !== item2.toString()) return false;
      } else {
        if (item1 !== item2) return false;
      }
    }
  };

  // Compare properties
  if (type === "[object Array]") {
    for (var i = 0; i < valueLen; i++) {
      if (compare(value[i], other[i]) === false) return false;
    }
  } else {
    for (var key in value) {
      if (value.hasOwnProperty(key)) {
        if (compare(value[key], other[key]) === false) return false;
      }
    }
  }

  // If nothing failed, return true
  return true;
}
