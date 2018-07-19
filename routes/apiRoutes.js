var db = require('../models');
var path = require('path');

module.exports = function(app){

  /* app.get('/saveGuy', function(req, res) {
    db.User.create({username: 'tom', email: 'tom@tom.com'}).then(function(thingWeSaves){
      console.log('this is the thing we saved!!!', thingWeSaves)
      res.json(thingWeSaves)
    })
  }) */

  app.get('/home', function(req, res){
    res.sendFile(path.join(__dirname, "../public/home.html"));;
  })

  app.get('/login', function(req, res){
    res.sendFile(path.join(__dirname, "../public/index.html"));;
  })
}