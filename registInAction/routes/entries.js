var Entry = require('../lib/entry')

exports.list = function (req, res, next) {
  var page = req.page
  Entry.getRange(page.from, page.to, function (err, entries) {
    if (err) return next(err)
    res.render('entries', {
      title: 'Entries',
      entries: entries
    })
  })
}

exports.form = function (req, res) {
  res.render('post', {
    title: 'Post'
  })
}

exports.submit = function (req, res, next) {
  var title = req.body.title
  var body = req.body.body
  var entry = new Entry({
    "username": res.locals.user.name,
    "title": title,
    "body": body
  })

  entry.save(function (err) {
    if (err) return next(err)
    if (user.remoteUser) {
      res.json({
        message: 'Entry added'
      })
    } else {
      res.redirect('/')
    }
  })
}