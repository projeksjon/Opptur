var express     = require('express');
var path        = require('path');
var logger      = require('morgan');
var cookieParser= require('cookie-parser');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var app         = express();
var router      = express.Router();
var User        = require('./models/user');
var Trip        = require('./models/trip');

app.use('/', express.static(path.join(__dirname,'/public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser('keyboardcat'));





//-----------------------API----------------------------------------


//app.use('/', router);

// Web routing
function send(res, path) {
    res.sendFile(path, function(err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
        else {
            res.status(200).end();
        }
    });
}
// Getters
app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    console.log("GET %s", req.path);
    send(res, __dirname + '/public/index.html');
});

app.post('/signUp', function(req, res){
  console.log(req.body);
  var newUser = new User(req.body);
  newUser.save(function(err, user)  {
        if (err) return console.error(err);
        else console.log("success")

      }
  )
});

// START SERVER

const PORT = 8080;
var server = app.listen(PORT, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Server listening on http://%s:%s', host, port);
});
app.post('/logIn', function(req,res){

  //Talk to the database, check if user exist
  //finds the user with the email and password from user-input
  //res.writeHead(200);
  var dbUser = User.find( req.body , function (err, user) {

    if(user.length>0) {
        console.log(user);
        console.log("Kallenavnet til denne brukeren er: " +user[0].nickname);
    }else {
      console.log('Wrong email or password');
      console.log("error - wrong input");
    }
  });
});

//-------------------------TRIP --------------------------------

app.post('/makeTrip', function(req, res){
  console.log(req.body);
  var newTrip = new Trip(req.body);
  newTrip.save(function(err, user)  {
        if (err) return console.error(err);
        else console.log("success")

      }
  )
});

app.post('/findTrip', function(req,res){

    //Talks to the database, check if trip exist
    var dbTrip = Trip.find( req.body , function (err, trip) {
        console.log(trip);
        console.log(+trip[0].tripName);
        if(trip.length>0) {
            console.log('det sendes inn input, trip');
        }else {
            console.log("error - wrong input");
        }
    });
});






//catch404andforwardtoerrorhandler
//app.use(function(req,res,next){
//  var err="";//newError('NotFound');
//  err.status=404;
//  next(err);
//});


//errorhandlers
//app.use(express.static('public'));




//----------------koble til databasen--------------------------------


mongoose.connect('mongodb://heroku_6055vbw4:blj69kp68glsc4nefksbvp48d3@ds019698.mlab.com:19698/heroku_6055vbw4');
var db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});

//-------------------------------------------------------------------


module.exports=app;
