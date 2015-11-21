"use strict";

// EXPRESS INIT / HELLO WORLD
var express = require( 'express');
var app = express();

app.get( '/', function( req,res ) 
{
	console.log("Hello Jon!");
	var obj = { Hello: "World "};

	res.send( obj );
});

app.listen(3000);
