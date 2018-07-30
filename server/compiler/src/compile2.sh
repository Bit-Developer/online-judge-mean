#!/bin/sh
#THE_CLASSPATH=temp
PROGRAM_SOURCE=SolutionTester.java
PROGRAM_NAME="SolutionTester"
#cd src
#for i in `ls ../lib/*.jar`
#  do
#  THE_CLASSPATH=${THE_CLASSPATH}:${i}
#done

echo "compile.sh is running ..."

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
echo ${DIR}
FILE1=${DIR}"/ParserUtil.java"
echo ${FILE1}
FILE2=${DIR}"/temp/Solution.java"
echo ${FILE2}
FILE2=${DIR}"/SolutionTester.java"
echo ${FILE2}
THE_CLASSPATH=${DIR}":"${DIR}"/temp"
echo ${THE_CLASSPATH}
TESTCASE_FILE=${DIR}"/testcase.txt";
echo ${TESTCASE_FILE}
TESTRESULT_FILE=${DIR}"/testresult.txt";
echo ${TESTRESULT_FILE}

# compile
javac -classpath ".:${THE_CLASSPATH}" ${FILE1} ${FILE2} ${FILE3}

if [ $? -eq 0 ]
then
  echo "compile worked!"
fi

# run
java -classpath ".:${THE_CLASSPATH}" $PROGRAM_NAME $TESTCASE_FILE $TESTRESULT_FILE
if [ $? -eq 0 ]
then
  echo "execution worked!"
fi