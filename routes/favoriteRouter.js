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

var Favorites = require('../models/favorites');

// Need to require ../models/Dishes too?

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
/*
create operation lifted from 
https://www.airpair.com/javascript/complete-expressjs-nodejs-mongodb-crud-skeleton
*/

.post(Verify.verifyOrdinaryUser, function(req, res) {
    // Get values from post request
    var postedBy = req.decoded._doc._id;
    console.log("postedBy = " + postedBy);
    var fave = req.body._id;
    console.log("favoriteDishes = " + fave);
    // call the create function for our DB
    Favorites.create( {
        postedBy : postedBy,
        favoriteDishes : fave,
        //{ new : true }
    }, function(err, favoritedish) {
        if (err) {
            res.send("There was a problem in create");
        } else {
            // favoriteDish has been created
            console.log("POST creating new favorite dish: " + fave);
            res.json(favoritedish);
        }
    });
})

/*
.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.create(req.body, function (err, favorite) {
        if (err) throw err;
        favorite.postedBy = req.decoded._doc._id;
        favorite.favoriteDishes.push(req.body);
        favorite.save(function (err, favorite) {
            if (err) throw err;
            console.log('Updated Favorites!');
            res.json(favorite);
        });
    });
})
*/

// fin
module.exports = favoriteRouter;