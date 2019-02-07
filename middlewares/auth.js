module.exports = (req, res, next) => {
  // OPTIONS preflight request should not check credentials
  if (req.method === 'OPTIONS' || req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json();
};
