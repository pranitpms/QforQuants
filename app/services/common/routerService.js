'use-strict';

var rootPath      = require('rfr');
var AppPath       = rootPath('/app/appConfig');
var ReplyRoute    = AppPath('/services/route/customRoute/reply/replyRoute');
var QuestionRoute = AppPath('services/route/customRoute/question/questionRoute');

var register = function(type,instance,router){
	switch(type){
		case 'reply'    : ReplyRoute.Register();
	}
};





module.exports = {
	Register : register
}