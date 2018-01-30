const fs = require('fs'),
      https = require('https'),
      http = require('http'),
      express = require('express'),
      session = require('express-session'),
      cors = require('cors'),
      proxy = require('express-http-proxy'),
      config = require('./config'),
      url = require('url'),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      schema = require('./schema'),
      path = require('path'),
      log = require('./utils/logger'),
      {graphqlExpress, graphiqlExpress} = require('apollo-server-express');


const app = express()

/////// create context for the grapql server
const buildOptions = (req) => {
    log.debug("Building New Options");
    let options = { schema, context: {} };
    options.context.session = req.session;
    if (req.cookies && req.cookies.deviceId) {
      options.context.deviceId = req.cookies.deviceId;
    }
    else {
      log.debug("The request doesn't have cookies:", req.cookies);
    }
    if (req.session && req.session.token) {
      options.context.token = req.session.token;
    }
    if(req.header("user-agent")){
        options.context.userAgent = req.header("user-agent");
    }
    log.debug("Context created:", options.context);
    return options;
  };
////////////////

app
 .use(express.static('public'))
 .use(session({
    secret: 'ping pong',
    resave: false,
    saveUninitialized: false,
    cookie: {
      //secure: true, // Add this back for https connections
    }
  }))

 // .use(async (req,res,next) => {
 //   console.log("Request Headers:", req.headers);
 //   console.log("Session", req.session);
 //   next();
 // })

 .get('/ping', async (req, res, next) => {
   res.send("pong");
 })

 .all('/1/*',proxy(config.cloud.URL))
 // .all('/api/*',proxy(config.cloud.URL,{
 //    proxyReqPathResolver: function(req) {
 //      return url.parse(req.url).path.replace('api',config.cloud.apiVersion);
 //    }
 // }))

 .get('/public/*', proxy(config.cloud.URL)) // path where the widget.js is located


 .get('/apiversion', async (req, res, next) => {
    try {
      const user = {"version":"0.0.1"}
      res.json(user);
    } catch (e) {
      next(e)
    }
  })


  .all('/graphql', cors({'origin':true, 'credentials':true}), bodyParser.json(), cookieParser(), graphqlExpress(buildOptions))
  .get('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }))

  // route for Ember
  .get('/*', async (req,res) => res.sendFile(path.join(__dirname,"/public/index.html")));

// const corsOption = function (req, cbk) {
//   let options = {};
//   options:
// }

const options = {
  key: fs.readFileSync(__dirname + '/config/ssl/server.key'),
  cert: fs.readFileSync(__dirname + '/config/ssl/server.crt')
};
https.createServer(options,app).listen(config.port.https);
http.createServer(app).listen(config.port.http);
