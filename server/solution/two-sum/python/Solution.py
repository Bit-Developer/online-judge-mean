class Solution(object):
    def twoSum(self, nums, target):
        if nums is None :
            return [0,0]
        if len(nums) <= 1:
            return [0,0]
        buff_dict = {}
        for i in range(len(nums)):
            if nums[i] in buff_dict:
                return [buff_dict[nums[i]], i]
            else:
                buff_dict[target - nums[i]] = i