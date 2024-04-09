class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        
        default_window = {}
        s1_length = len(s1)
        for i in s1:
            if i not in default_window:
                default_window[i] = 0
            default_window[i] += 1 

        window = default_window.copy()
        current_length = 0
        r = 0

        for l in range(len(s2)):
            r = l
            while s2[r] in window and window[s2[r]] > 0:
                window[s2[r]] -= 1
                current_length += 1
                r += 1
                if current_length == s1_length:
                    return True
                if r == len(s2):
                    break
            window = default_window.copy()
            current_length = 0
        return False


solution = Solution()   
print(solution.checkInclusion("adc", "dcda")) # True
print(solution.checkInclusion("abc", "eidbaooo"))  # True
print(solution.checkInclusion("ab", "eidboaoo"))   # False
print(solution.checkInclusion("hello", "ooolleoooleh"))  # False
print(solution.checkInclusion("abc", "cbaebabacd"))  # True
print(solution.checkInclusion("abcd", "abcdbaccd"))  # True


            

