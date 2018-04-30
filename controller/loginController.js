var UserModel = require('../model/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
module.exports.displayLoginPage = function (req, res) {
    res.render('pages/index');
  };
module.exports.RegistrationFunction = function (req, res)
{
    if (req.method != 'GET') {
        req.checkBody('name', 'Name is required').notEmpty();
        req.checkBody('username', 'Username is required').notEmpty();
        req.checkBody('email', 'A valid email address is required').isEmail();
        req.checkBody('password', 'Password is Invalid').isLength({ min: 4 }).equals(req.body.password2);
        var errors = req.validationErrors();
        console.log(errors.length);
        if (!errors) {
            UserModel.createNewUser(req.body, function (err, user) {
                if (err) throw err;
            });
            req.flash('success_msg', 'You are registered and can now login');
            return res.redirect('/login');
        } else {
            return  res.render('pages/register', { errors: errors || [], formdata: req.body });
        }
    } else {
        res.render('pages/register', { errors: errors || [], formdata: req.body });
    }
   
};

passport.use(new LocalStrategy(
    function (username, password, done) {

        UserModel.getUserByUsername(username, function (err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, { message: 'Unknown User' });
            }

            UserModel.comparePassword(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Invalid password' });
                }
            });

        });
    }));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    UserModel.findById(id, function (err, user) {
        done(err, user);
    });
});

module.exports.loginFunction = function (req, res) {
    if (req.method == 'GET') {
        res.render('pages/login');
    }
};

module.exports.dashboardFunction = function (req, res) {
    res.render('pages/dashboard');
}

module.exports.logoutFunction = function (req, res) {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
};