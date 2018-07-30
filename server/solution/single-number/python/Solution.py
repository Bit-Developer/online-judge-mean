class Solution(object):
    def singleNumber(self, nums):
        if (nums is None) :
            return 0
        res = 0
        for num in nums:
            res ^= num
        return res