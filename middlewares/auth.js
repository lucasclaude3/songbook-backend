module.exports = (req, res, next) => {
  console.log(req);
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/');
  }
}
