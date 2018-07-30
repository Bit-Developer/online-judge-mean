class Solution(object):
    def reverseString(self, s) :
        if (s is None) :
            return ""
        l = len(s)
        if l < 2 :
            return s
        return self.reverseString(s[l/2:]) + self.reverseString(s[:l/2])