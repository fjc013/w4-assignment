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
var Dishes = require('../models/dishes');

// Need to require ../models/Dishes too?

var favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')

// Return list of favorites for this user only

.get(Verify.verifyOrdinaryUser, function(req,res,next) {
    Favorites.find({ postedBy : req.decoded._doc._id })
    .populate('postedBy')
    .populate('favoriteDishes')
    .exec(function (err, favorite) {
        if (err) throw err;
        res.json(favorite);
    });
})

//findOneAndUpdate

.post(Verify.verifyOrdinaryUser, function(req, res) {
    // Get the id of the poster
    var queryKey = { postedBy : req.decoded._doc._id};
    var options = { upsert : true, new : true };
    console.log("postedBy = " + req.decoded._doc._id);
    console.log("favoriteDishes = " + req.body._id);
    /*
      findOneAndUpdate with option upsert:true creates a document
      if it doesn't exist. Allows the use of $push.
    */ 
    Favorites.findOneAndUpdate( queryKey, {
        postedBy : req.decoded._doc._id,
        //$push: {favoriteDishes : req.body._id} 
        //$addToSet: ensures unique entries in arrays - silent fail
        $addToSet: {favoriteDishes : req.body._id} 

    }, options, function(err, favoritedish) {
        if (err) {
            res.send("There was a problem in create");
            res.json(favoritedish);
        } else {
            // favoriteDish has been created
            console.log("POST creating new favorite dish");
            res.json(favoritedish);
        }
    });
})

.delete(Verify.verifyOrdinaryUser, function(req, res, next){
    Favorites.remove({ postedBy : req.decoded._doc._id }, function(err, resp) {
        if (err) throw err;
        res.json(resp);
    })
});

favoriteRouter.route('/:dishId')

.delete(Verify.verifyOrdinaryUser, function(req, res, next){
    Favorites.update({ postedBy : req.decoded._doc._id }, 
        { $pullAll: { favoriteDishes: [req.params.dishId] } }, 
    {
        new: true
    }, function(err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

// fin
module.exports = favoriteRouter;