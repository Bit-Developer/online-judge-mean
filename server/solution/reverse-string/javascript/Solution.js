var reverseString = function(s) {
  if (!s) {
    return "";
  }
  answer = "";
  for (i = s.length - 1; i >= 0; i--) {
    answer = answer.concat(s[i]);
  }
  return answer;
};

module.exports = reverseString;
