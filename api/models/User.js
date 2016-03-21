/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,
  attributes: {
  	//user: {
  	//	type: 'string',
  	//	required: true,
  	//  defaultsTo: '',
    //  unique: true
  	//},
  	name: {
  		type: 'string',
  		required: true
      //,
      //notEmpty: true
  	}
    ,
    title: {
      type: 'string'
      //,
      //notEmpty: true
    }
    ,
  	email: {
  		type: "email",
  		required: true,
      unique: true
      //,
      //notEmpty: true
  	}
    ,
    password: {
      type: "string"
      //,
      //notEmpty: true
    }
    ,
    admin: {
      type: 'boolean',
      defaultsTo: false
    }
    /*
    ,
    toJSON: function() {
		  var obj = this.toObject();
		  //delete obj.createdAt;
		  //delete obj.updatedAt;
      obj.encryptedPassword = obj.password;
		  return obj;
    }
    */ 	
  }
  /*
  ,
  beforeUpdate: function (values, next){
    if(values.admin == 'checkAdmin'){
      values.admin = false;
    }else if(values.admin[0] == 'checkAdmin'){
      values.admin = true;
    }
  }
  ,
  beforeCreate: function (values, next){
    console.log(values);
    return next();
    // This checks to make sure the password and password confirmation match before creating record
    if (!values.password || values.password != values.confirmation) {
      return next({err: "Password doesn't match password confirmation."});
    }else{
      return next();
    }
  
    require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
      if (err) return next(err);
      values.encryptedPassword = encryptedPassword;
      // values.online= true;
      next();
    });    
  }
  */
};

