class Solution {
    public int searchInsert(int[] nums, int target) {
        if (nums == null || nums.length == 0) {
            return 0;
        }
        
        int start = 0;
        int end = nums.length - 1;
        
        while (start + 1 < end) {
            int mid = start + (end - start) / 2;
            if (nums[mid] == target) {
                return mid;
            }
            else if (nums[mid] < target) {
                start = mid;
            }
            else {
                end = mid;
            }
        }
        
        if (nums[start] >= target){
            return 0;
        }
        
        if (nums[end] < target){
            return end + 1;
        } else {
            return end;
        }
    }
}