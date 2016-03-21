module.exports = function (req, res, ok) {

  console.log('p user can see');
  
  if(typeof req.session === 'undefined' || typeof req.session.User === 'undefined'){
    var requireLoginError = [{name: 'requireLogin', message: 'You must be signed in.'}]
    req.session.flash = {
      err: requireLoginError
    }
    res.redirect('/session/new');
    return;
  }

  var sessionUserMatchesId = req.session.User.id === req.param('id');
  var isAdmin = req.session.User.admin;

  // The requested id does not match the user's id,
  // and this is not an admin
  if (!(sessionUserMatchesId || isAdmin)) {
    var noRightsError = [{name: 'noRights', message: 'You must be an admin.'}]
    req.session.flash = {
      err: noRightsError
    }
    res.redirect('/session/new');
    return;
  }

  ok();

};