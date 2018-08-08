var mongoose = require("mongoose");
const config = require("../config/server-config");

var gracefulShutdown;
// mongodb url
const { db: { host, port, name } } = config;
var dbURI = `mongodb://${host}:${port}/${name}`;
if (process.env.NODE_ENV === "production") {
  dbURI = process.env.MONGOLAB_URI;
}
console.log("dbURI:", dbURI);
mongoose.connect(dbURI);

// Get collection names
mongoose.connection.on("open", function() {
  const users = mongoose.connection.db.collection("users");

  users.findOne({ username: "jojozhuang" }, function(err, user) {
    if (!user) {
      const defaultUser = {
        username: "jojozhuang",
        email: "jojozhuang@gmail.com",
        hash:
          "9f51bcd7a80a8da6fa02dcc9e136cd2ea5a08a24c988e4d822ebeb0b3eb430fd9a62af4fc6e1c456cb12cbc5b8792f737166ca39b3bb0fe4d34e1cd1ae134fd3",
        salt: "f8dae7c30d811b322b8763afc424fec0",
        role: "admin",
        timecreated: Date.now
      };

      users.save(defaultUser, function(err) {
        if (err) {
          console.log("Error occurs when creating default user:" + err);
        }
        console.log(
          "[Database Initialization] New admin user 'jojozhuang' was created!"
        );
        console.log("[Default Admin] User Name: jojozhuang, Password: 111111");
      });

      users.save(defaultUser);
    } else {
      console.log("[Default Admin] User Name: jojozhuang, Password: 111111");
    }
  });

  /*
  mongoose.connection.db.listCollections().toArray(function(err, collections) {
    if (err) {
      throw new Error(error);
    } else {
      module.exports.Collection = collections;
      collections.map(function(collection) {
        console.log("found collection %s", collection.name);
      });
    }
  });*/
});

// CONNECTION EVENTS
mongoose.connection.on("connected", function() {
  console.log("Mongoose connected to " + dbURI);
});
mongoose.connection.on("error", function(err) {
  console.log("Mongoose connection error: " + err);
});
mongoose.connection.on("disconnected", function() {
  console.log("Mongoose disconnected");
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function() {
    console.log("Mongoose disconnected through " + msg);
    callback();
  });
};
// For nodemon restarts
process.once("SIGUSR2", function() {
  gracefulShutdown("nodemon restart", function() {
    process.kill(process.pid, "SIGUSR2");
  });
});
// For app termination
process.on("SIGINT", function() {
  gracefulShutdown("app termination", function() {
    process.exit(0);
  });
});
// For Heroku app termination
process.on("SIGTERM", function() {
  gracefulShutdown("Heroku app termination", function() {
    process.exit(0);
  });
});

// BRING IN YOUR SCHEMAS & MODELS
require("./user");
