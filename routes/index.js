var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
      name: req.session.name || 0,
      role: req.session.role || 0
   });
});

router.get('/login', function(req, res, next) {
    if (req.session.username) {
        res.redirect('/')
    } else {
        res.render('auth/login')
    }
})


router.get('/register', function(req, res, next) {
    if (req.session.username) {
      res.redirect('/')
    } else {
      res.render('auth/register')
    }
})

router.get('/logout', function(req, res, next) {
    req.session.destroy(function(err) {
      req.session = null;
      res.clearCookie('connect.sid');
      res.clearCookie('session');
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    })
})
module.exports = router;
