#!/bin/sh -e

usage() {
  echo "OVERVIEW: Build apps according to BUILD_ENV value. Meant to be used for Heroku deployment"
  exit
}

if [ "$1" = '-h' ] || [ "$1" = '--help' ]; then
  usage
fi

(
  PROJECT_ROOT="$(cd $(dirname $0); pwd)"

  echo "running heroku.build.sh ..."

  cd $PROJECT_ROOT
  echo $PROJECT_ROOT

  if [ "$BUILD_ENV" = "frontend" ]; then
    echo "npm run build"
    npm run build
  elif [ "$BUILD_ENV" = "backend" ]; then
    echo "npm start"
    npm start
  else
    echo "Error: no build config for BUILD_ENV value '$BUILD_ENV'"
    exit 1
  fi
)