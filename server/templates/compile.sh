#!/bin/sh

THE_CLASSPATH=
PROGRAM_SOURCE=SolutionTester.java
PROGRAM_NAME=SolutionTester
#cd src
#for i in `ls ../lib/*.jar`
#  do
#  THE_CLASSPATH=${THE_CLASSPATH}:${i}
#done

echo "compile.sh is running ..."

javac -classpath . SolutionTester.java

if [ $? -eq 0 ]
then
  echo "compile worked!"
fi

java -classpath ".:${THE_CLASSPATH}" $PROGRAM_NAME
if [ $? -eq 0 ]
then
  echo "execution worked!"
fi