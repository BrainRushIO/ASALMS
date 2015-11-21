"use strict";

// EXPRESS INIT / HELLO WORLD
var express = require( 'express');
var app = express();

app.get( '/', function( req,res ) 
{

	res.send("Hello World!");
});

var server = app.listen(80, function(){

	var host = server.address().address;
	var port = server.address().port;

	console.log('app listenin at http://%s:$s', host, port);

});
