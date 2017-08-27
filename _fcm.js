var FCM = require('fcm-push');
module.exports = {
  init: function(options) {
    this.fcm = new FCM(process.env.android_apikey);
  },
  send: function(options) {
    this.fcm.send(options, function(err, response){
      if (err) {
        console.log("Something has gone wrong!");
      } else {
        console.log("Successfully sent with response: ", response);
      }
    });
  }
}
