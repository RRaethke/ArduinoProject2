
var express = require("express");
var bodyParser = require("body-parser");
// ******************************************************************************
var app = express();
var passport = require('passport')
var session = require('express-session')
var env = require('dotenv').load()
var exphbs = require('express-handlebars')

var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

// For Passport
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//For Handlebars
app.set('views', './auth/views')
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

//Models
var models = require("./models");

// Routes
// =============================================================

require("./routes/apiRoutes.js")(app);
var authRoute = require('./routes/auth.js')(app, passport);


// console.log('this is our models!!!!!', models);
//load passport strategies
require('./config/passport/passport.js')(passport, models.user);


//Sync Database
models.sequelize.sync().then(function () {
  console.log('Nice! Database looks fine')

}).catch(function (err) {
  console.log(err, "Something went wrong with the Database Update!")
});


require('./app.js')(app);

app.listen(8080, function (err) {
  if (!err)
    console.log("Site is live"); else console.log(err)

});


