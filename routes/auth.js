var authController = require('../controllers/authcontroller.js');

module.exports = function(app,passport){

app.get('/signup', authController.signup);


app.get('/signin', authController.signin);


app.post('/signup', passport.authenticate('local-signup',  { successRedirect: '/home',
                                                    failureRedirect: '/signup'}
                                                    ));


app.get('/dashboard',isLoggedIn, function(req, res) {
    console.log('helloo!!!');
    res.send('WE HIT DASHBOADDD');
});


app.get('/logout',authController.logout);


app.post('/signin', passport.authenticate('local-signin',  { successRedirect: '/home',
                                                    failureRedirect: '/signin'}
                                                    ));


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/signin');
}


}






