'use-strict';

var rootPath      = require('rfr');
var AppPath       = rootPath('/app/appConfig');
var QuestionRoute = AppPath('services/route/customRoute/question/questionRoute');

var register = function(type,instance,router){
	
	switch(type){
		case 'question' : QuestionRoute.Decorate(instance,router);
	}
};

module.exports = {
	Register : register
}