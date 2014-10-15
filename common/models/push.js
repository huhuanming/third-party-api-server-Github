module.exports = function(Push) {

    Push.sharedClass.find('create', true).shared = false;
    Push.sharedClass.find('upsert', true).shared = false;
    Push.sharedClass.find('exists', true).shared = false;
    Push.sharedClass.find('findById', true).shared = false;
    Push.sharedClass.find('find', true).shared = false;
    Push.sharedClass.find('findOne', true).shared = false;
    Push.sharedClass.find('deleteById', true).shared = false;
    Push.sharedClass.find('count', true).shared = false;
    Push.sharedClass.find('updateAttributes', false).shared = false;

	  Push.informRestaurant = function(data, callback) {
	  	var JPush = require("../../node_modules/jpush-sdk/index.js");
		var client = JPush.buildClient('b89976da389a244be40e0d55', 'c639cc75123cc4916b5b902d');
		client.push().setPlatform('ios', 'android')
		    .setAudience(JPush.ALL)
		    .setNotification('Hi, JPush', JPush.ios('ios alert'), JPush.android('android alert', null, 1))
		    .setMessage('msg content')
		    .setOptions(null, 60, null, true)
		    .send(function(err, res) {
		        if (err) {
		            // console.log(err.message);
		            // return;
		        } else {
		            // console.log('Sendno: ' + res.sendno);
		            // console.log('Msg_id: ' + res.msg_id);
		            // return;
		             callback(null, JSON.parse(res.msg_id));
		        }
		    });
    };
     
   Push.remoteMethod(
        'informRestaurant', 
        {
          http: {path: '/inform_restaurant', verb: 'post'},
          accepts: {arg: 'data', type: 'object', http: {source: 'body'}},
          returns: {arg: 'resultObject', root: true, type: 'string'}
        }
    );

};
