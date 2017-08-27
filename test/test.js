var request = require('request');
var examples = {
  ios: require('./ios.config.json'),
  android: require('./android.config.json')
}

// Customize
var config = {
  os: "android",
  root: "[micropush server root url]"
};

request({
  uri: config.root + '/send',
  method: 'POST',
  json: examples[config.os],
}, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body.id)
  }
});
