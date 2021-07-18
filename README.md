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

## Steps
Manually deploy the same git repo to two apps in heroku. Use `Multi Procfile buildpack` to deploy multiple apps in a monorepo.

### Server
Create app `online-judge-api` for backend api.
```sh
cd online-judge-mean
heroku login
heroku create -a online-judge-api
heroku buildpacks:add -a online-judge-api heroku-community/multi-procfile
heroku buildpacks:add -a online-judge-api heroku/nodejs
heroku config:set -a online-judge-api PROCFILE=server/Procfile
git push https://git.heroku.com/online-judge-api.git HEAD:master
```
Output.
```sh
-----> Building on the Heroku-20 stack
-----> Using buildpacks:
       1. heroku-community/multi-procfile
       2. heroku/nodejs
-----> Multi-procfile app detected
       Copied server/Procfile as Procfile successfully
-----> Node.js app detected

-----> Creating runtime environment

       NPM_CONFIG_LOGLEVEL=error
       NODE_VERBOSE=false
       NODE_ENV=production
       NODE_MODULES_CACHE=true

-----> Installing binaries
       engines.node (package.json):  14.16.1
       engines.npm (package.json):   6.14.12

       Resolving node version 14.16.1...
       Downloading and installing node 14.16.1...
       npm 6.14.12 already installed with node

-----> Installing dependencies
       Installing node modules

       > fsevents@1.2.13 install /tmp/build_8088dee8/node_modules/webpack-dev-server/node_modules/fsevents
       > node install.js


       Skipping 'fsevents' build as platform linux is not supported

       > core-js@3.15.1 postinstall /tmp/build_8088dee8/node_modules/@angular-devkit/build-angular/node_modules/core-js
       > node -e "try{require('./postinstall')}catch(e){}"


       > nodemon@2.0.12 postinstall /tmp/build_8088dee8/node_modules/nodemon
       > node bin/postinstall || exit 0

       Love nodemon? You can now support the project via the open collective:
        > https://opencollective.com/nodemon/donate


       > core-js@2.6.12 postinstall /tmp/build_8088dee8/node_modules/core-js
       > node -e "try{require('./postinstall')}catch(e){}"


       > @angular/cli@12.1.2 postinstall /tmp/build_8088dee8/node_modules/@angular/cli
       > node ./bin/postinstall/script.js

       added 1973 packages in 35.405s

-----> Build
       Running build

       > online-judge-mean@1.0.0 build /tmp/build_8088dee8
       > ng build --configuration production

- Generating browser application bundles (phase: setup)...
Compiling @angular/core : es2015 as esm2015
Compiling @angular/common : es2015 as esm2015
Compiling @angular/platform-browser : es2015 as esm2015
Compiling @angular/platform-browser-dynamic : es2015 as esm2015
Compiling @angular/router : es2015 as esm2015
Compiling ngx-bootstrap/utils : es2015 as esm2015
Compiling ngx-bootstrap/alert : es2015 as esm2015
Compiling ngx-bootstrap/positioning : es2015 as esm2015
Compiling ngx-bootstrap/component-loader : es2015 as esm2015
Compiling ngx-bootstrap/modal : es2015 as esm2015
Compiling @angular/common/http : es2015 as esm2015
Compiling ngx-progressbar : es2015 as esm2015
Compiling ngx-progressbar/http : es2015 as esm2015
Compiling @angular/forms : es2015 as esm2015
Compiling ngx-quill : es2015 as esm2015
✔ Browser application bundle generation complete.
- Generating ES5 bundles for differential loading...
✔ Browser application bundle generation complete.
✔ ES5 bundle generation complete.
- Copying assets...
✔ Copying assets complete.
- Generating index html...
✔ Index html generation complete.

       Initial Chunk Files                      | Names                |      Size
       main-es5.90ba2f4cb80e5b7dd7ab.js         | main                 | 601.20 kB
       main-es2015.90ba2f4cb80e5b7dd7ab.js      | main                 | 516.32 kB
       scripts.21f0c1bd71e842514f91.js          | scripts              | 460.58 kB
       styles.c5cddc00a67a7685f4e0.css          | styles               | 201.41 kB
       polyfills-es5.848e1e43cddfc69fa565.js    | polyfills-es5        | 132.31 kB
       polyfills-es2015.656bc0fb7423ef9ac49a.js | polyfills            |  36.13 kB
       runtime-es2015.fa0d675be33153add91d.js   | runtime              |   3.50 kB
       runtime-es5.fa0d675be33153add91d.js      | runtime              |   3.50 kB

       | Initial ES5 Total    |   1.37 MB
       | Initial ES2015 Total |   1.19 MB

       Lazy Chunk Files                         | Names                |      Size
       161-es5.6c645a8d348aedb1bc37.js          | -                    | 208.98 kB
       161-es2015.6c645a8d348aedb1bc37.js       | -                    | 208.98 kB

       Build at: 2021-07-18T07:54:32.380Z - Hash: f951e994350c45380bd0 - Time: 159327ms
Warning: /tmp/build_8088dee8/src/app/interceptor/error.interceptor.ts depends on 'rxjs/add/operator/catch'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies
Warning: /tmp/build_8088dee8/src/app/interceptor/error.interceptor.ts depends on 'rxjs/add/operator/do'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies
Warning: /tmp/build_8088dee8/src/app/interceptor/error.interceptor.ts depends on 'rxjs/observable/throw'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies
Warning: /tmp/build_8088dee8/src/app/interceptor/timeout.interceptor.ts depends on 'rxjs/add/operator/timeout'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies
Warning: /tmp/build_8088dee8/src/app/services/alert.service.ts depends on 'rxjs/Subject'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies
Warning: /tmp/build_8088dee8/src/app/services/user.service.ts depends on 'rxjs/add/operator/map'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies

-----> Caching build
       - node_modules

-----> Pruning devDependencies
       removed 1269 packages and audited 705 packages in 17.322s

       44 packages are looking for funding
         run `npm fund` for details

       found 1 moderate severity vulnerability
         run `npm audit fix` to fix them, or `npm audit` for details

-----> Build succeeded!
-----> Discovering process types
       Procfile declares types -> web
-----> Compressing...
       Done: 108.9M
-----> Launching...
       Released v5
       https://online-judge-api.herokuapp.com/ deployed to Heroku
```
### Client
Create app `online-judge-mean` for client website.
```sh
cd online-judge-mean
heroku login
heroku create -a online-judge-mean
heroku buildpacks:add -a online-judge-mean heroku-community/multi-procfile
heroku buildpacks:add -a online-judge-mean heroku/nodejs
heroku config:set -a online-judge-mean PROCFILE=Procfile
git push https://git.heroku.com/online-judge-mean.git HEAD:master
```
Output.
```sh
-----> Building on the Heroku-20 stack
-----> Using buildpacks:
       1. heroku-community/multi-procfile
       2. heroku/nodejs
-----> Multi-procfile app detected
cp: '/tmp/build_d0cd865f/Procfile' and '/tmp/build_d0cd865f/Procfile' are the same file
       Copied Procfile as Procfile successfully
-----> Node.js app detected

-----> Creating runtime environment

       NPM_CONFIG_LOGLEVEL=error
       NODE_VERBOSE=false
       NODE_ENV=production
       NODE_MODULES_CACHE=true

-----> Installing binaries
       engines.node (package.json):  14.16.1
       engines.npm (package.json):   6.14.12

       Resolving node version 14.16.1...
       Downloading and installing node 14.16.1...
       npm 6.14.12 already installed with node

-----> Installing dependencies
       Installing node modules

       > fsevents@1.2.13 install /tmp/build_d0cd865f/node_modules/webpack-dev-server/node_modules/fsevents
       > node install.js


       Skipping 'fsevents' build as platform linux is not supported

       > core-js@3.15.1 postinstall /tmp/build_d0cd865f/node_modules/@angular-devkit/build-angular/node_modules/core-js
       > node -e "try{require('./postinstall')}catch(e){}"


       > nodemon@2.0.12 postinstall /tmp/build_d0cd865f/node_modules/nodemon
       > node bin/postinstall || exit 0

       Love nodemon? You can now support the project via the open collective:
        > https://opencollective.com/nodemon/donate


       > core-js@2.6.12 postinstall /tmp/build_d0cd865f/node_modules/core-js
       > node -e "try{require('./postinstall')}catch(e){}"


       > @angular/cli@12.1.2 postinstall /tmp/build_d0cd865f/node_modules/@angular/cli
       > node ./bin/postinstall/script.js

       added 1973 packages in 36.795s

-----> Build
       Running build

       > online-judge-mean@1.0.0 build /tmp/build_d0cd865f
       > ng build --configuration production

- Generating browser application bundles (phase: setup)...
Compiling @angular/core : es2015 as esm2015
Compiling @angular/common : es2015 as esm2015
Compiling @angular/platform-browser : es2015 as esm2015
Compiling @angular/platform-browser-dynamic : es2015 as esm2015
Compiling @angular/router : es2015 as esm2015
Compiling ngx-bootstrap/utils : es2015 as esm2015
Compiling ngx-bootstrap/alert : es2015 as esm2015
Compiling ngx-bootstrap/positioning : es2015 as esm2015
Compiling ngx-bootstrap/component-loader : es2015 as esm2015
Compiling ngx-bootstrap/modal : es2015 as esm2015
Compiling @angular/common/http : es2015 as esm2015
Compiling ngx-progressbar : es2015 as esm2015
Compiling ngx-progressbar/http : es2015 as esm2015
Compiling @angular/forms : es2015 as esm2015
Compiling ngx-quill : es2015 as esm2015
✔ Browser application bundle generation complete.
- Generating ES5 bundles for differential loading...
✔ Browser application bundle generation complete.
✔ ES5 bundle generation complete.
- Copying assets...
✔ Copying assets complete.
- Generating index html...
✔ Index html generation complete.

       Initial Chunk Files                      | Names                |      Size
       main-es5.90ba2f4cb80e5b7dd7ab.js         | main                 | 601.20 kB
       main-es2015.90ba2f4cb80e5b7dd7ab.js      | main                 | 516.32 kB
       scripts.21f0c1bd71e842514f91.js          | scripts              | 460.58 kB
       styles.c5cddc00a67a7685f4e0.css          | styles               | 201.41 kB
       polyfills-es5.848e1e43cddfc69fa565.js    | polyfills-es5        | 132.31 kB
       polyfills-es2015.656bc0fb7423ef9ac49a.js | polyfills            |  36.13 kB
       runtime-es2015.fa0d675be33153add91d.js   | runtime              |   3.50 kB
Warning: /tmp/build_d0cd865f/src/app/interceptor/error.interceptor.ts depends on 'rxjs/add/operator/catch'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies
Warning: /tmp/build_d0cd865f/src/app/interceptor/error.interceptor.ts depends on 'rxjs/add/operator/do'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies
Warning: /tmp/build_d0cd865f/src/app/interceptor/error.interceptor.ts depends on 'rxjs/observable/throw'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies
Warning: /tmp/build_d0cd865f/src/app/interceptor/timeout.interceptor.ts depends on 'rxjs/add/operator/timeout'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies
Warning: /tmp/build_d0cd865f/src/app/services/alert.service.ts depends on 'rxjs/Subject'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies
Warning: /tmp/build_d0cd865f/src/app/services/user.service.ts depends on 'rxjs/add/operator/map'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies
       runtime-es5.fa0d675be33153add91d.js      | runtime              |   3.50 kB

       | Initial ES5 Total    |   1.37 MB
       | Initial ES2015 Total |   1.19 MB

       Lazy Chunk Files                         | Names                |      Size
       161-es5.6c645a8d348aedb1bc37.js          | -                    | 208.98 kB
       161-es2015.6c645a8d348aedb1bc37.js       | -                    | 208.98 kB

       Build at: 2021-07-18T07:59:51.947Z - Hash: 147819932479913ef35d - Time: 169249ms

-----> Caching build
       - node_modules

-----> Pruning devDependencies
       removed 1269 packages and audited 705 packages in 17.991s

       44 packages are looking for funding
         run `npm fund` for details

       found 1 moderate severity vulnerability
         run `npm audit fix` to fix them, or `npm audit` for details

-----> Build succeeded!
-----> Discovering process types
       Procfile declares types -> web
-----> Compressing...
       Done: 109M
-----> Launching...
       Released v4
       https://online-judge-mean.herokuapp.com/ deployed to Heroku
```
## Update
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

## Troubleshooting
Check the buildpack.
```sh
$ heroku git:remote -a online-judge-api
$ heroku buildpacks
=== online-judge-api Buildpack URLs
1. heroku-community/multi-procfile
2. heroku/nodejs
```
Use the default `nodejs` buildpack.
```sh
heroku buildpacks:set heroku/nodejs
```

* [How to deploy multiple apps in a monorepo with Heroku](https://medium.com/inato/how-to-setup-heroku-with-yarn-workspaces-d8eac0db0256)
* [Heroku Multi Procfile buildpack](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-multi-procfile)
* [Buildpacks](https://devcenter.heroku.com/articles/buildpacks)

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

# Rich text editor
To show the math formula correctly in description or solution, need to install `katex` and add its css and js to `angular.js`.
```java
  "styles": [
    "./node_modules/katex/dist/katex.min.css",
  ],
  "scripts": [
    "./node_modules/katex/dist/katex.min.js"
  ],
```
