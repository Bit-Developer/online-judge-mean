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
        expected = int(line.replace("\n",""))
        
        ret = Solution.Solution().singleNumber(nums)
        #print expected
        #print ret
        if (expected != ret) :
            if (nums is None) :
                strnums = 'null'
            else:
                strnums = integerListToString(nums)
            print "[Fail]" + strnums + ";" + str(ret) + ";" + str(expected)
            passall = False
            break

        i = i + 2
        #print out

    if passall == True :
        print "[Success]Your solution passed all " + str(len(lines)/2) + " test cases!"

if __name__ == '__main__':
    main()