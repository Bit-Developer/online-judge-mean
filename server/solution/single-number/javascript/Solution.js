var singleNumber = function(nums) {
  if (!nums) {
    return 0;
  }
  return nums.reduce((x, y) => x ^ y);
};

module.exports = singleNumber;
