"use strict";

// EXPRESS INIT / HELLO WORLD
var express = require( 'express');
var bodyparser = require('body-parser');
var app = express();

app.use(bodyparser.json()); // support json encoded bodies
app.use(bodyparser.urlencoded({ extended: true })); // support encoded bodies

app.get( '/', function( req,res ) 
{
	res.send("Welcome to ASA Ghost Match Landing Page");
    console.log("landed on home page");
});

//app.listen( process.env.PORT || 3000 );	

/// MONGO INIT
var mongodb = require( 'mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;
//mongo db below
var db;
var dbURL = process.env.DBURL || 'mongodb://localhost:27017/test';
MongoClient.connect( dbURL, ( err, inDB ) =>
{
	if ( err )
	{
		console.log( "err: " + err );
		return;
	}

	db = inDB;
	app.listen( process.env.PORT || 3000 );	
} );

// NEW PLAYER
app.post( '/data', ( req, res ) =>
{
    var newDataPack = req.body;
    console.log("added a DATAPACK via post");

	var datapacks = db.collection( 'datapacks');

	datapacks.insertOne( newDataPack, ( err, result ) =>
	{
		if( err )
		{
			console.error( err );
			return res.status( 500 ).send( err );
		}
		else
		{
			//console.log( JSON.stringify( result.ops, null, '  ' ) );
			console.log( "new dataPack with id: " +  result.insertedId );
			var playerWithId = result.ops[0];
			return res.send( playerWithId );
		}
	} );
});

function dbGetPlayerData( playerId, callback )
{
	var players = db.collection( 'players');
	console.log( playerId );
	players.findOne( { _id: ObjectID.createFromHexString( playerId ) }, callback );
}

function dbSetPlayerData( playerId, playerData, callback )
{
	var players = db.collection( 'players');
	players.updateOne( { _id: ObjectID.createFromHexString( playerId ) }, playerData, callback );
}

// LOAD PLAYER DATA
app.get( '/players/:playerId', ( req, res ) => 
{
	dbGetPlayerData( req.params.playerId, ( err, playerData ) =>
	{
		if ( playerData )
		{
			console.log( "found player with id: " + req.playerId );
			return res.send( playerData );
		}
	} );
});