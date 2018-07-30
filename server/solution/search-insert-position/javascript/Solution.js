var searchInsert = function(nums, target) {
  if (nums == null || nums.length < 2) {
    return 0;
  }
  let left = 0;
  let right = nums.length - 1;
  let middle;

  while (left <= right) {
    middle = Math.floor((right - left) / 2) + left;

    if (nums[middle] === target) {
      return middle;
    } else if (nums[middle] < target) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return left;
};

module.exports = searchInsert;
