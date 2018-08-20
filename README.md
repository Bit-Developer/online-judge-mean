# Online Judge
A web application for online judge(algorithm questions), built with MEAN stack(MongoDB, Express, Angular and Node.js).

# Function
This application is used to solve algorithm questions. You can submit the solution to see if it passes all the test cases. Currently, three languages are supported, java, javascript and python.
The implemented functions are listed as follows.
* User Authentication - Based Token, Register, Login, Auto Login, User Profile, Reset Password, etc.
* User Management - Create, Update, Delete user.
* Question Management - Create, Update, Delete question.
* Database Management - Import and Export data with csv files for users, questions and submissions.
* Judging System - Judging Engine, Solution Template, Submission History, Multi-programming language support.
* UI - RichTextEditor, Code Editor, Progress Bar, Loading Image are applied.

The following functions are under development.
* Contest - Generate contest by randomly selecting four questions from the question library.
* Collaborative code editor - Different users can work on the same solution simultaneously.

<kbd>![image](/public/questions.png)</kbd>

# Technology
The Server is built with Express and MongoDB. The used libraries for server are listed as follows.
* RESTful API: express, express router, mongoose, cors
* Logging: morgan, winston
* User Authentication: jsonwebtoken, passport, cookie-parser, express-jwt
* Import/Export Data: multer, csv-express, fast-csv

The Client is built with Angular and 3rd-party libraries, see below.
* CSS and Icon: bootstrap, font-awesome
* Rich Text Editor: ngx-editor
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
Access http://localhost:12080/ in web browser, enjoy!

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
Follow tutorial [Deploying Full Stack Angular App to Heroku](https://jojozhuang.github.io/tutorial/angular/deploying-full-stack-angular-app-to-heroku/) to deploy this app to Heroku(RESTful API + Frontend Angular).

Follow tutorial [Continuously Deploy MEAN Stack App to Heroku and Netlify with Travis-CI](https://jojozhuang.github.io/tutorial/angular/continuously-deploy-mean-stack-app-to-heroku-and-netlify-with-travis-ci/) to continuously deploy this Full Stack app to Heroku(RESTful API) and Netlify(Frontend Angular).

# Portfolio
Read portfolio [Online Judge(MEAN)](https://jojozhuang.github.io/portfolio/online-judge-mean/) to learn the main functions of this MEAN stack app.

# Tutorial
Read tutorial [Building Online Judge Application With MEAN Stack](https://jojozhuang.github.io/tutorial/angular/building-online-judge-application-with-mean-stack/) to learn how this MEAN stack app is built.
