var router = require('express').Router();
var passport = require('passport');
var User = require('../Models/user');

// ===================================
// Authroutes
// ===================================
router.get('/register', (req, res) =>{
    res.render('register');
})

router.post('/register', (req, res) =>{
    var newUser = new User({username : req.body.username});
    User.register(newUser,req.body.password)
        .then(user =>{ 
            req.flash('success','You can now log in'+user.username);
            res.redirect('/login');
        }).catch(e =>{
             req.flash('error',e.message);
             res.redirect('/register')
        })
})

router.get('/login', (req, res) =>{
    res.render('login')
})

router.post('/login', passport.authenticate('local',{
    successRedirect : '/campground',
    failureRedirect : '/login',
    successFlash : 'Welcome back',
    failureFlash : 'Oops something went wrong'
}),(req, res) =>{

})

router.get('/logout', (req, res) =>{
    req.logout();
    req.flash('success','Logged out successfully!!')
    res.redirect('/login')
})

module.exports = router;