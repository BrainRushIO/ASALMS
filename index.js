var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({keys: ['secretkey1', 'secretkey2', '...']}));

app.use(express.static(path.join(__dirname, 'public')));

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Configure passport-local to use account model for authentication
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

var dbURL = process.env.DBURL || 'mongodb://localhost:27017/test';
// Connect mongoose
mongoose.connect(dbURL, function(err) {
  if (err) {
    console.log('Could not connect to mongodb on localhost. Ensure that you have mongodb running on localhost and mongodb accepts connections on standard ports!');
  }
});

// Register routes
app.use('/', require('./routes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;






//"use strict";
//
//// EXPRESS INIT / HELLO WORLD
//var express = require( 'express');
//var bodyparser = require('body-parser');
//var app = express();
//
//app.use(bodyparser.json()); // support json encoded bodies
//app.use(bodyparser.urlencoded({ extended: true })); // support encoded bodies
//
//app.get( '/', function( req,res ) 
//{
//	res.send("Welcome to ASA Ghost Match Landing Page");
//    console.log("landed on home page");
//});
//
////app.listen( process.env.PORT || 3000 );	
//
////var mongodb = require( 'mongodb');
////var MongoClient = mongodb.MongoClient;
////var ObjectID = mongodb.ObjectID;
//
////var db;
//
////mongo db below
////MongoClient.connect( dbURL, ( err, inDB ) =>
////{
////	if ( err )
////	{
////		console.log( "err: " + err );
////		return;
////	}
////
////	db = inDB;
////	app.listen( process.env.PORT || 3000 );	
////} );
//
//var dbURL = process.env.DBURL || 'mongodb://localhost:27017/test';
//var db = mongoose.createConnection(dbURL, function(err) {
//    if (err) {
//    console.log('Could not connect to mongodb on localhost. Ensure that you have mongodb running on localhost and mongodb accepts connections on standard ports!');
//  }
//});




//// NEW PLAYER
//app.post( '/data', ( req, res ) =>
//{
//    var newDataPack = req.body;
//    console.log("added a DATAPACK via post");
//
//	var datapacks = db.collection( 'datapacks');
//
//	datapacks.insertOne( newDataPack, ( err, result ) =>
//	{
//		if( err )
//		{
//			console.error( err );
//			return res.status( 500 ).send( err );
//		}
//		else
//		{
//			//console.log( JSON.stringify( result.ops, null, '  ' ) );
//			console.log( "new dataPack with id: " +  result.insertedId );
//			var playerWithId = result.ops[0];
//			return res.send( playerWithId );
//		}
//	} );
//});
//
//function dbGetPlayerData( playerId, callback )
//{
//	var players = db.collection( 'players');
//	console.log( playerId );
//	players.findOne( { _id: ObjectID.createFromHexString( playerId ) }, callback );
//}
//
//function dbSetPlayerData( playerId, playerData, callback )
//{
//	var players = db.collection( 'players');
//	players.updateOne( { _id: ObjectID.createFromHexString( playerId ) }, playerData, callback );
//}
//
//// LOAD PLAYER DATA
//app.get( '/players/:playerId', ( req, res ) => 
//{
//	dbGetPlayerData( req.params.playerId, ( err, playerData ) =>
//	{
//		if ( playerData )
//		{
//			console.log( "found player with id: " + req.playerId );
//			return res.send( playerData );
//		}
//	} );
//});