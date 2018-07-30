import json
import Solution

def stringToIntegerList(input):
    return json.loads(input)

def stringToInt(input):
    return int(input)

def integerListToString(nums, len_of_list=None):
    if not len_of_list:
        len_of_list = len(nums)
    return json.dumps(nums[:len_of_list])

def main():
    with open('testcase.txt', "r") as f:
        lines = f.readlines()
    i = 0
    passall = True
    while i < len(lines) :
        line = lines[i]
        nums = stringToIntegerList(line)
        if (nums == "null") :
            nums = None
        #print nums
        line = lines[i+1]
        #print line
        target = stringToInt(line)
        line = lines[i+2]
        #print line
        expected = stringToIntegerList(line)
        
        ret = Solution.Solution().twoSum(nums, target)

        if (expected != ret) :
            if (nums is None) :
                strnums = 'null'
            else:
                strnums = integerListToString(nums)
            print "[Fail]" + strnums + ", " + str(target) + ";" + integerListToString(ret) + ";" + integerListToString(expected)
            passall = False
            break

        i = i + 3
        #print out

    if passall == True :
        print "[Success]Your solution passed all " + str(len(lines)/3) + " test cases!"

if __name__ == '__main__':
    main()