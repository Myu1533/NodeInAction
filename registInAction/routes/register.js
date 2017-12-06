var User = require('../lib/user')

exports.form = function (req, res) {
  res.render('register', {
    title: 'Register'
  })
}

exports.submit = function (req, res, next) {
  var name = req.body.username
  var pass = req.body.userpass
  User.getByName(name, function (err, user) {
    if (err) return next(err)
    if (user.id) {
      res.error('Username already taken!')
      res.redirect('back')
    } else {
      user = new User({
        name: name,
        pass: pass
      })
      user.save(function (err) {
        if (err) return next(err)
        req.session.uid = user.id
        res.redirect('/')
      })
    }
  })
}