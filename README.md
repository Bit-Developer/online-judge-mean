# Online Judge
A web application for online judge(algorithm questions), built with MEAN stack(MongoDB, Express, Angular and Node.js).

<kbd>![image](/public/questions.png)</kbd>

<kbd>![image](/public/solution.png)</kbd>

# Function
This application is used to solve algorithm questions. You can submit the solution to see if it passes all test cases. Below are the available features.
* Token Based Authentication - Register, Login, Auto Login, User Profile, Reset Password, etc.
* User Management - Create, Update, Delete user.
* Question Management - Create, Update, Delete question.
* Database Management - Import and Export data with csv files for users, questions and submissions.
* Judging System - Judging Engine, Solution Template, Submission History, Multi-programming language support.
* Programming Languages - Three languages are currently supported, including Java, Javascript and Python.
* UI - RichTextEditor, Code Editor, Progress Bar, Loading Image are applied.

The following functions are under development.
* Contest - Generate contest by randomly selecting four questions from the question library.
* Collaborative code editor - Different users can work on the same solution simultaneously.

# Technology
The Server is built with Express and MongoDB. The used libraries for server are listed as follows.
* RESTful API: express, express router, mongoose, cors
* Logging: morgan, winston
* User Authentication: jsonwebtoken, passport, cookie-parser, express-jwt
* Import/Export Data: multer, csv-express, fast-csv

The Client is built with Angular and 3rd-party libraries, see below.
* CSS and Icon: bootstrap, font-awesome
* Rich Text Editor: ngx-quill
* Code Editor: ngx-monaco-editor
* Progress Bar: ngx-progressbar

# Demo
Three available demos:
* `Live Demo on Heroku:` <a href="https://online-judge-mean.herokuapp.com/" target="\_blank">https://online-judge-mean.herokuapp.com/</a>
* `Live Demo on Netlify:` <a href="https://online-judge.netlify.com/" target="\_blank">https://online-judge.netlify.com/</a>
* `Live Demo on Azure:` <a href="https://online-judge.azurewebsites.net/" target="\_blank">https://online-judge.azurewebsites.net/</a>

*Note: The demo websites may be slow when you access them for the first time. Be patient!*

Try it out on any live demo website with the following accounts:
* Regular User: demo / 123456
* Administrator: admin / 123456

# Setup Locally
## 1. Source Files
```bash
git clone https://github.com/jojozhuang/online-judge-mean.git
cd online-judge-mean
npm install
npm run dev
```
Access http://localhost:9020/ in web browser, enjoy!

* If you run this on Windows, you need to install 'win-node-env' first. Otherwise, server will not get started and you will get 'NODE_ENV is not recognized' error, see [“NODE_ENV” is not recognized as an internal or external command, operable command or batch file](https://stackoverflow.com/questions/11928013/node-env-is-not-recognized-as-an-internal-or-external-command-operable-comman).
```bash
npm install -g win-node-env
```

## 2. Configuration
Notice, four different environments are configured for this app. Edit './server/config/server-config.js' to setup your site, especially the MongoDB connection url.

 Environment  | Command       | Description
--------------|---------------|-----------------------
local         | npm run local | Development environment using local MongoDB.
dev           | npm run dev   | Development environment using remote MongoDB hosted on mLab.
stage         | npm run stage | Testing environment using remote MongoDB hosted on mLab.
prod          | npm run prod  | Production environment for deployment.

## 3. Master Date
When the server is initially started, use admin user 'jojozhuang' and password '111111' to login. Go to 'Database' to import data for 'users' and 'questions'. The data files are located in 'backup_csv' folder.

# Deployment
Follow tutorial [Online Judge - Deploying Full Stack Angular App to Heroku](https://jojozhuang.github.io/tutorial/online-judge-deploying-full-stack-angular-app-to-heroku) to deploy this app to Heroku(RESTful API + Frontend Angular).

Follow tutorial [Online Judge - Continuously Deploy MEAN Stack App to Heroku and Netlify with Travis-CI](https://jojozhuang.github.io/tutorial/online-judge-continuously-deploy-mean-stack-app-to-heroku-and-netlify-with-travis-ci) to continuously deploy this Full Stack app to Heroku(RESTful API) and Netlify(Frontend Angular).

## Manually push change to Heroku app
Manually deploy the same git repo to two apps in heroku.

Server.
```sh
cd online-judge-mean
heroku login
heroku git:remote -a online-judge-api
git commit --allow-empty -m "Upgrading to heroku-20"
git push heroku master
```

Client.
```sh
cd online-judge-mean
heroku login
heroku git:remote -a online-judge-mean
git commit --allow-empty -m "Upgrading to heroku-20"
git push heroku master
```

* [How to deploy multiple apps in a monorepo with Heroku](https://medium.com/inato/how-to-setup-heroku-with-yarn-workspaces-d8eac0db0256)

# Portfolio
Read portfolio [Online Judge(MEAN)](https://jojozhuang.github.io/project/online-judge-mean) to learn the main functions of this MEAN stack app.

# Tutorial
Read tutorial [Online Judge - Building Web App with MEAN Stack](https://jojozhuang.github.io/tutorial/online-judge-building-web-app-with-mean-stack) to learn how this MEAN stack app is built.


# Docker
Build for production. All the compiled html files and js files will be generated in `dist`.
```sh
npm run build-nas
```
Create image with node.
```sh
docker build -t jojozhuang/online-judge-server .
docker build -t jojozhuang/online-judge-web .
```
Create container.
```sh
docker run --name online-judge-server -p 9021:80 -d jojozhuang/online-judge-server
docker run --name online-judge-web -p 9020:80 -d jojozhuang/online-judge-web
```
Access http://192.168.0.2:9020/ in browser.