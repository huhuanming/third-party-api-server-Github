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
		    .setAudience(JPush.registration_id(data.supervisor_registration_id))
		    .setNotification('overbooking', JPush.ios('有客户下单了,快看看吧', 'default', parseInt(data.badge)), JPush.android('有客户下单了, 快看看吧', '有单啦', 1, {"badge": data.badge}))
		    .setMessage('有客户下单了,快看看吧')
		    .setOptions(null, 60, null, true)
		    .send(function(err, res) {
		        if (err) {
		        	
		        } else {
		             callback(null, JSON.parse(res.msg_id));
		        }
		    });
    };
     
   Push.remoteMethod(
        'informRestaurant', 
        {
          http: {path: '/restaurant/overbooking', verb: 'post'},
          accepts: {arg: 'data', type: 'object', http: {source: 'body'}},
          returns: {arg: 'resultObject', root: true, type: 'string'}
        }
    );

};
