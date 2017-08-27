const apn = require('apn');
module.exports = {
  init: function(options) {
    this.apnProvider = new apn.Provider(options);
  },
  send: function(options) {
    var note = new apn.Notification();

    // set aps payload
    for(let key in options.notification) {
      note.aps[key] = options.notification[key];
    }

    // set custom data payload
    for(let key in options.data) {
      note.payload[key] = options.data[key];
    }

    // set topic
    note.topic = options.to.topic;

    // send
    this.apnProvider.send(note, options.to.token).then( (result) => {
      console.log(JSON.stringify(result));
    });
  }
}
