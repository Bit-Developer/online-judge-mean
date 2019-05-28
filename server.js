const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 12080;

// Run the app by serving the static files in the dist directory
app.use(express.static(`${__dirname}/dist`));

// If an incoming request uses a protocol other than HTTPS,
// redirect that request to the same url but with HTTPS
const forceSSL = function () {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    next();
  };
};

// For all GET requests, send back index.html so that PathLocationStrategy can be used
app.get('/*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/index.html`));
});

// Instruct the app to use the forceSSL middleware
app.use(forceSSL());

// Start the app by listening on the default Heroku port
app.listen(port, () => {
  console.log(`Server is up and running at http://localhost:${port}/`);
});
