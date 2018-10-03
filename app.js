var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var localStrategy = require('passport-local');
var methodOverride = require('method-override');
var flash = require('connect-flash');

var User = require('./Models/user')

var commentRoutes = require('./routes/comments'),
    campgroundRoutes = require('./routes/campground'),
    indexRoutes = require('./routes/index');
// seedDb.removeCampDB()
// seedDb.removeComDB()
// seedDb.addDB()

mongoose.Promise = global.Promise;
var app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'))

// =================
// passport configuration
// =================
app.use(require('express-session')({
    secret : 'Siddharth raymaghi',
    resave : true,
    saveUninitialized : false
}))
app.use(flash());

app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.user = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
})
// ======================
// mongoose
// ======================
const url = 'mongodb://localhost:27017/yelp_camp';
mongoose.connect(url);

// ==========================
// routes
// ==========================
app.get('/', (req, res) =>{
    res.redirect('/campground')
 })


app.use('/',indexRoutes);
app.use('/campground/:id/comments',commentRoutes);
app.use('/campground',campgroundRoutes)

const port = process.env.PORT || 3000;
app.listen(port, () =>console.log("Listening on port 3000"))