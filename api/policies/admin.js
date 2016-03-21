/**
 * Allow any authenticated user.
 */
module.exports = function (req, res, ok) {

  //console.log(req);
  //console.log(res);

  console.log('p admin');

  if(typeof req.session === 'undefined' || typeof req.session.User === 'undefined'){
    var requireLoginError = [{name: 'requireLogin', message: 'You must be signed in.'}]
    req.session.flash = {
      err: requireLoginError
    }
    res.redirect('/session/new');
    return;
  }

  // User is allowed, proceed to controller
  if (req.session.User && req.session.User.admin) {
    return ok();
  }

  // User is not allowed
  else {
    var requireAdminError = [{name: 'requireAdminError', message: 'You must be an admin.'}]
    req.session.flash = {
      err: requireAdminError
    }
    res.redirect('/session/new');
    return;
  }
};