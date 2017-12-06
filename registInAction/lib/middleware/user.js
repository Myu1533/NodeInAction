var User = require('../user')

var user = function (req, res, next) {
  var uid = req.session.uid
  if (!uid) return next()
  User.get(uid, function (err, user) {
    if (err) return next(err)
    req.user = res.locals.user = user
    next()
  })
}
module.exports = user