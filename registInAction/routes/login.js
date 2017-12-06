var User = require('../lib/user')

exports.form = function (req, res) {
  res.render('login', {
    title: 'Login'
  })
}

exports.submit = function (req, res, next) {
  var name = req.body.username
  var pass = req.body.userpass
  console.log(name)
  console.log(pass)
  User.authenticate(name, pass, function (err, user) {
    if (err) return next(err)
    if (user) {
      req.session.uid = user.id
      res.redirect('/')
    } else {
      res.error('Sorry! invalid credentials.')
      res.redirect('back')
    }
  })
}

exports.logout = function (req, res) {
  req.session.destroy(function (err) {
    if (err) throw err
    res.redirect('/')
  })
}