'use-strict';

var util    = require('util');
var format  = util.format;
module.exports = {

	RouteUrl : function(name){

		var route = {
			getAll : format('/api/%s',name),
			get    : format('/api/%s/:%s',name,name+'id'),
			post   : format('/api/%s',name),
			put    : format('/api/%s/:%s',name,name+'id'),
			delete : format('/api/%s/:%s',name,name+'id'),
			search : format('/api/%s/?options=',name)
		};
		return route;
	},


}




	// UserRoute : {
	// 	getAll : '/api/user',
	// 	get    : '/api/user/:userid',
	// 	post   : '/api/user',
	// 	put    : '/api/user/:userid',
	// 	delete : '/api/user/:userid',
	// 	search : '/api/user/?options='
	// },

	// ReplyRoute : {
	// 	getAll : '/api/reply',
	// 	get    : '/api/reply/:replyid',
	// 	post   : '/api/reply',
	// 	put    : '/api/reply/:replyid',
	// 	delete : '/api/reply/:replyid',
	// 	search : '/api/reply/?options='
	// },

	// QuestionRoute : {
	// 	getAll : '/api/question',
	// 	get    : '/api/question/:questionid',
	// 	post   : '/api/question',
	// 	put    : '/api/question/:questionid',
	// 	delete : '/api/question/:questionid',
	// 	search : '/api/question/?options='
	// },

	// RoleRoute : {
	// 	getAll : '/api/role',
	// 	get    : '/api/role/:roleid',
	// 	post   : '/api/role',
	// 	put    : '/api/role/:roleid',
	// 	delete : '/api/role/:roleid',
	// 	search : '/api/role/?options='
	// },

	// CategoryRoute : {
	// 	getAll : '/api/category',
	// 	get    : '/api/category/:categoryid',
	// 	post   : '/api/category',
	// 	put    : '/api/category/:categoryid',
	// 	delete : '/api/category/:categoryid',
	// 	search : '/api/category/?options='
	// }