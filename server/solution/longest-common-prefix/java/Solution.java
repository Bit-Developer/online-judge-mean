class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs == null || strs.length == 0) {
            return "";
        }
  
        int minlen = Integer.MAX_VALUE;
        String str = "";
        for (int i = 0; i < strs.length; i++) {
            if (strs[i].length() < minlen) {
                minlen = strs[i].length();
                str = strs[i];
            }
        }
        
        if (minlen == 0) {
            return "";
        }
        
        for (int i = 0; i < str.length(); i++) {
            for (int j = 0; j < strs.length; j++) {
                if (strs[j].charAt(i) != str.charAt(i)) {
                    return str.substring(0, i);
                }
            }
        }
        
        return str;
    }
}