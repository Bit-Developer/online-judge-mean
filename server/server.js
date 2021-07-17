// ./server/server.js
var express = require("express");
var favicon = require("serve-favicon");
var cookieParser = require("cookie-parser");
var path = require("path");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var winston = require("./config/winston-config-rotate");
var cors = require("cors");
var passport = require("passport");
var config = require("./config/server-config");
var FileApi = require("./api/FileApi");

// Create working directory
console.log(config);
const { app: { port, cors_client_url, temp_directory } } = config;
const tempDir = path.resolve(__dirname, temp_directory);
FileApi.creatDirectory(tempDir, (err, message) => {
  if (err) {
    console.log(err);
  } else {
    console.log(message);
  }
});
// Bring in the data model
require("./models/mongodb");
// Bring in the Passport config after model is defined
require("./config/passport-config");

var app = express();
/* test delay
app.use( ( req, res, next ) => {
  setTimeout(next, Math.floor( ( Math.random() * 10000 ) + 100 ) );
});*/
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(cookieParser());

// logging
app.use(morgan("short"));
app.use(morgan("combined", { stream: winston.stream }));

// configure app to use bodyParser(), this will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cors());

app.use(function(req, res, next) {
  /*
  res.header(
    "Access-Control-Allow-Origin",
    process.env.CLIENT_WEBSITE || cors_client_url
  );*/
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header("preflightContinue", false);
  next();
});

// Initialise Passport before using the route middleware
app.use(passport.initialize());

// routes
var routes = require("./routes");
// Use the API routes when path starts with /api
app.use("/api", routes);

// Error handling
app.use(function(err, req, res, next) {
  // error level logging
  winston.error(winston.combinedFormat(err, req, res));
  winston.writeError(err);

  //console.log(err);
  if (err.name === "UnauthorizedError") {
    res.status(401);
    res.json({
      message:
        err.name + ": " + err.message ||
        " You have no authorization to view this page!"
    });
  }

  next(err, req, res, next);
});

// development error handler, will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    console.log(app.get("env"));
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler, no stacktraces leaked to user
if (app.get("env") === "production") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json("error", {
      message: err.message,
      error: {}
    });
  });
}

app.listen(port, () => {
  console.log("Server is up and running on port number " + port);
});
