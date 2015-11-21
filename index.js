"use strict";

// EXPRESS INIT / HELLO WORLD
var express = require( 'express');
var app = express();

app.get( '/hello', function( req,res ) 
{
	console.log("Hello World!");
	var obj = { Hello: "World "};

	res.send( obj );
});


