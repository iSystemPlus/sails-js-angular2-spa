module.exports = function (req, res, ok) {

  console.log('p auth');

    // User is allowed, proceed to controller
    if (typeof req.session !== 'undefined' && req.session.User) {
        return ok();
    }
    else {  // User is not allowed
        var requireLoginError = [{name: 'requireLogin', message: 'You must be signed in.'}]
        req.session.flash = {
            err: requireLoginError
        }
        res.redirect('/session/new');
        return;
        //res.send(403);
    }
};