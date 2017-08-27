const express = require('express')
const bodyParser = require('body-parser')
module.exports = {
  init: function(options) {
    const app = express()
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(express.static('.'))
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    if(options) {
      this.view = options.view;
      for(let method in options.routes) {
        let handlers = options.routes[method];
        for(let route in handlers) {
          console.log(method);
          app[method](route, handlers[route]);
          console.log(route);
        }
      }
    }
    app.listen(process.env.PORT || 3000, function () { console.log('Listening!') })
  },
  respond: function(options) {
    options.res.send(this.view[options.response.view])
  }
}
