module.exports = function(UserSms) {

    UserSms.sharedClass.find('create', true).shared = false;
    UserSms.sharedClass.find('upsert', true).shared = false;
    UserSms.sharedClass.find('exists', true).shared = false;
    UserSms.sharedClass.find('findById', true).shared = false;
    UserSms.sharedClass.find('find', true).shared = false;
    UserSms.sharedClass.find('findOne', true).shared = false;
    UserSms.sharedClass.find('deleteById', true).shared = false;
    UserSms.sharedClass.find('count', true).shared = false;
    UserSms.sharedClass.find('updateAttributes', false).shared = false;

	  UserSms.createSms = function(data, callback) {
      data.apikey = "40548d7911e660636d1319b924a79212";
      data.tpl_id = 2;
      post_data = require('querystring').stringify(data);
      var option = {
        method: "POST",
        host: "yunpian.com",
        port: 80,
        path: "/v1/sms/tpl_send.json",
        headers: {
            "Accept": 'text/plain',
            "charset": 'utf-8' ,
            "Content-Type": 'application/x-www-form-urlencoded',  
            "Content-Length": post_data.length  
        }
      };
      var request = require('http').request(option, function(serverFeedback){
        if (serverFeedback.statusCode == 200) {

          serverFeedback.setEncoding('utf-8');

          var responseString = '';

          serverFeedback.on('data', function(data) {
            responseString += data;
          });

          serverFeedback.on('end', function() {
            var responseObject = JSON.parse(responseString);
            switch(responseObject.code){
              case 0:
                UserSms.create(
                  {
                    mobile: (data.mobile),
                    code: (responseObject.code),
                    tpl_value: (data.tpl_value),
                    sid: (responseObject.result.sid)
                  });
                callback(null, responseObject);
                break;
              default:
            }
          });
        }else{
          UserSms.create(
          {
              mobile: (data.mobile),
              code: (responseObject.code),
              tpl_value: (data.tpl_value)
          });
          callback(null, "not work");    
        }
      });
        request.write(post_data + "\n");  
        request.end(); 
    };
     
   UserSms.remoteMethod(
        'createSms', 
        {
          http: {path: '/send_tpl_sms', verb: 'post'},
          accepts: {arg: 'data', type: 'object', http: {source: 'body'}},
          returns: {arg: 'resultObject', root: true, type: 'string'}
        }
    );

};
