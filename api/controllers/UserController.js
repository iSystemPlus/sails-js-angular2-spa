/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  new: function(req, res){
  	res.locals.flash = _.clone(req.session.flash);
    res.view();
	  res.locals.flash = {};

  }
  ,
  create: function (req, res, next) {
    var values = req.params.all();
    if(values.admin != undefined && values.admin.constructor === Array){
      if(values.admin[1] === 'on'){
        values.admin = true;
      }else{
        values.admin = false;
      }
    }else{
      values.admin = false;
    }
    
    if(req.session.User.admin){ delete values.admin; }

  	//console.log('running self defined create function');
    User.create(values, function userCreated(err,user){
      //if(err) return next(err);
      //console.log('User Controllers => ' + err);
      if(err){
        console.log(err);
        req.session.flash = {
          err: err
        }
        //if error redirect back to sign-up page
        return res.redirect('/user/new');
      }
      //res.json(user);
      //req.session.flash = {};
      //新增底下這兩段code
      req.session.authenticated = true;
      req.session.User = user;
      res.redirect('/user/show/' + user.id);
    });
  },
  //render the profile view (e.g. /views/show.ejs)
  show: function(req, res, next){
    console.log(req.session);
    User.findOne(req.param('id'), function foundUser(err, user){
      if(err) return next(err);
      if(!user) return next();
      res.view({
        user: user
      });
    });
  }
  ,
  index: function(req, res, next){
    console.log("index");
    //Get an array of all users in the User collection(e.g. table)
    User.find(function foundUsers(err, users){
      if(err) return (err);
      //pass the array down to the /views/index.ejs page
      res.view({
        users: users
      });
    });
  }
  ,
  //render the edit view (e.g. /views/edit.ejs)
  edit: function(req, res, next){

    //Find the user from the id passed in via params
    User.findOne(req.param('id'), function foundUser(err, user){
      if(err) return next(err);
      if(!user) return next('User doesn\'t exist.');

      res.view({
        user: user
      });
    });
  }
  ,
  // process the info from edit view
  update: function(req, res, next){
    var values = req.params.all();
    if(values.admin != undefined && values.admin.constructor === Array){
      if(values.admin[1] === 'on'){ values.admin = true;
      }else{  values.admin = false;
      }
    }else{  values.admin = false;
    }

    if(req.session.User.admin){ delete values.admin; }

    User.update(req.param('id'), values, function userUpdated(err){
      if (err){
        return res.redirect('/user/edit/' + req.param('id'));
      }

      res.redirect('/user/show/' + req.param('id'));
    });
  }
  ,
  destroy: function(req, res, next){
    console.log("Hi, destroy");
    console.log(req);
    res.redirect('/user');
    /*
    User.findOne(req.param('id'), function foundUser(err, user){
      if (err) return next(err);
      if(!user) return next('User doesn\'t exist.');

      User.destroy(req.param('id'), function userDestroyed(err) {
        if(err) return next(err);
      });

      res.redirect('/user');
    });
    */
  }
};

