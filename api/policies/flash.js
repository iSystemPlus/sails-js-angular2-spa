module.exports = function(req, res, next) {

  console.log('p flash');

  res.locals.flash = {};

  if(!req.session.flash) return next();

  res.locals.flash = _.clone(req.session.flash);

  // clear flash
  req.session.flash = {};

  next();
};