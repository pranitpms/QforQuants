'use-strict';

var userCollection        = require('userCollection');
var roleCollection        = require('userRoleCollection');
var questionCollection    = require('questionCollection');
var replyCollection       = require('replyCollection');
var categoryCollection    = require('categoryCollection');
var collections           = require('collectionEnumCollection').Collections;

module.exports = {

	GetCollection : function(collections){

		switch(collections){
			case collections.users    : return userCollection.users;
			case collections.role     : return roleCollection.userRole;
			case collections.question : return questionCollection.questions;
			case collections.category : return categoryCollection.category;
			case collections.reply    : return replyCollection.reply;
			default                   : return null;
		};

	}

}