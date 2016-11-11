'use-strict';

var rootPath      = require('rfr');
var AppPath       = rootPath('/app/appConfig');
var ReplyRoute    = AppPath('/services/route/customRoute/reply/replyRoute');

var register = function(type,instance){
	switch(type){
		case 'reply' : ReplyRoute.Register();
	}
};



module.exports = {
	Register : register
}