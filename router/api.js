var passport = require('passport');
var loginController = require('./../controller/loginController');
var express = require('express');
var router = express.Router();

router.get('/', loginController.displayLoginPage);
router.get('/register', loginController.RegistrationFunction);
router.post('/register', loginController.RegistrationFunction);
router.get('/login', loginController.loginFunction);
router.post('/login', passport.authenticate('local', { successRedirect: '/dashboard', failureRedirect: '/login', failureFlash: 'Login Failed' }),
    function (req, res) {
        res.redirect('/dashboard', ensureAuthenticated,);
    });
router.get('/dashboard', ensureAuthenticated, loginController.dashboardFunction);


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        //req.flash('error_msg','You are not logged in');
        res.redirect('/login');
    }
}


router.get('/logout',loginController.logoutFunction);
module.exports = router;
