// Add this to the very top of the first file loaded in your app
var apm = require('elastic-apm-node').start({
  serviceName: 'launchstore',
  secretToken: 'CHVh3HCWOChB5Q2mQt',
  serverUrl: 'https://4fe1d29230dc4fc3936909f42553ee84.apm.us-east-1.aws.cloud.es.io:443',
  environment: 'my-environment'
})

const express = require('express');
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');
const routes = require('./routes');
const session = require('./config/session');

const server = express();

server.use(session);
server.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));
server.use(methodOverride('_method'));
server.use(routes);

server.set('view engine', 'njk');

nunjucks.configure('src/app/views', {
  express: server,
  autoescape: false,
  noCache: true
});

server.listen(3000, function () {
  console.log('server is running on port 3000.');
});
