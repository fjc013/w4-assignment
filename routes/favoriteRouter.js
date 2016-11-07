// JavaScript File dishes.js
/*
Create a Node module named favoriteRouter.js that implements 
the Express router for the /favorites REST API end point.
*/

var express = require('express');
var bodyParser = require('body-parser');

// Require for JSON Web Token Authentication
var Verify = require('./verify');

// Require mongoose
var mongoose = require('mongoose');

var Favorites = require('../models/dishes');

var favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')

.get(Verify.verifyOrdinaryUser, function(req,res,next) {
    Favorites.find({})
    .populate('postedBy')
    .populate('favoriteDishes')
    .exec(function (err, favorite) {
        if (err) throw err;
        res.json(favorite);
    });
})

.post(Verify.verifyOrdinaryUser,Verify.verifyAdmin, function(req, res, next){
    Dishes.create(req.body, function(err, favorite) {
        if (err) throw err;
        console.log("Favorite created!");
        var id = favorite.id;
        
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end("Added the favorite with id: " + id);
    });
})
// needs work
