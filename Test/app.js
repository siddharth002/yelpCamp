var express               = require('express'),
    bodyParser            = require('body-parser'),
    mongoose              = require('mongoose'),
    passport              = require('passport'),
    localStrategy         = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    User                  = require('./models/user')

var app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine','ejs');
app.use(require('express-session')({
    secret : 'Siddharth',
    resave : false,
    saveUninitialized : false
}))
app.use(passport.initialize());
app.use(passport.session());


passport.use(new  localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect('mongodb://localhost:27017/test');


// =================
// Routes
// ==================
app.get('/',(req, res) =>{
    res.redirect('/register')
})

app.get('/register',(req, res) =>{
    res.render('register');
})

app.post('/register', (req, res) =>{
     User.register(new User({username : req.body.username}), req.body.password, (e, user) =>{
         if(e){
             console.log(e)
             return res.render('register')
         }
        //  passport.authenticate('local')(req, res, function(){
             res.redirect('/secret')
        //  })
     })
})

app.get('/login', (req, res) =>{
    res.render('login');
})

app.post('/login',passport.authenticate('local',{
    successRedirect : '/secret',
    failureRedirect : '/login'
}) ,(req, res) =>{

})

app.get('/logout', (req, res) =>{
    req.logout();
    res.redirect('/login')
})
app.get('/secret',isLoggedIn, (req, res) =>{
    res.render('secret');
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login')
}

app.listen(3000, ()=>{
    console.log('Server is running.......')
})