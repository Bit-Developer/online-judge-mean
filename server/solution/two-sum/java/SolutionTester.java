import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;

public class SolutionTester {
    private static final String TESTCASE_FILE = "testcase.txt";
    private static final String TESTRESULT_FILE = "testresult.txt";

    public static void main(String[] args) {
        Solution solution = new Solution();

        //System.out.println("testTwoSum");
        
        boolean testResult = true;
        try {
            BufferedReader br = new BufferedReader(new FileReader(TESTCASE_FILE));
            try {
                String line;
                int count = 0;
                while ((line = br.readLine()) != null) {
                    int[] nums = ParserUtil.stringToIntegerArray(line);
                    line = br.readLine();
                    int target = Integer.parseInt(line);
                    line = br.readLine();
                    int[] expected = ParserUtil.stringToIntegerArray(line);
                    // create an test execution
                    int[] ret = solution.twoSum(nums, target);

                    //String out = ParserUtil.integerArrayToString(ret);

                    // create a test display name
                    // String testCase = "Test Two Sum: Input: " + Arrays.toString(nums) + ", " + target + "; Your answer:" + Arrays.toString(ret) + "; Expected answer: " + Arrays.toString(expected);
                    //System.out.println(testCase);

                    testResult = Arrays.equals(expected, ret);
                    count++;
                    
                    if (!testResult) {
                        String content = "[Fail]Failed at: Input: " + Arrays.toString(nums) + ", " + target + "; Your answer:" + Arrays.toString(ret) + "; Expected answer: " + Arrays.toString(expected);
                        System.out.println("[Fail]" + Arrays.toString(nums) + ", " + target + ";" + Arrays.toString(ret) + ";" + Arrays.toString(expected));
                        saveTestResult(content);
                        break;
                    }
                }
                if (testResult) {
                    System.out.println("[Success]Your solution passed all " + count +" test cases!");
                    saveTestResult("[Success]Your solution passed all " + count +" test cases!");
                }
            }
            catch (Exception io) {
                System.out.println(io.getMessage());
                printToFile(io);
            }
            finally {
                br.close();
            }
        }
        catch (IOException ioe) {
            System.out.println(ioe.getMessage());
            printToFile(ioe);
        } finally {
        }
    }

    public static void saveTestResult(String content) {
        BufferedWriter bw = null;
        try {
            bw = new BufferedWriter(new FileWriter(TESTRESULT_FILE));
            bw.write(content);
        } catch (IOException ioe) {
            ioe.printStackTrace();
        } finally {
            try {
                if (bw != null) {
                    bw.close();
                }
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
    }

    public static void printToFile(Exception ex) {
        PrintWriter pw = null;
        try {
            pw = new PrintWriter(TESTRESULT_FILE);
            ex.printStackTrace(pw);
        } catch (IOException ioe) {
            ioe.printStackTrace();
        } finally {
            try {
                if (pw != null) {
                    pw.close();
                }
            } catch (Exception ex2) {
                ex2.printStackTrace();
            }
        }
    }
}
