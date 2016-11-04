// JavaScript File leaderRouter.js
//Create a Node module named leaderRouter.js that 
// implements the Express router for the /leadership REST API end point.

// JavaScript File leaderRouter.js
/*
Create a Node module named leaderRouter.js that implements the 
Express router for the /leaders REST API end point.
*/

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Require for JSON Web Token Authentication
var Verify = require('./verify');

var Leadership = require('../models/leadership');

var leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')

.get(Verify.verifyOrdinaryUser, function(req,res,next){
    Leadership.find({}, function(err, leader) {
        if (err) throw err;
        res.json(leader);
    });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    Leadership.create(req.body, function(err, leader) {
        if (err) throw err;
        console.log('Leader created!');
        var id = leader._id;
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Added the leader with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    Leadership.remove({}, function(err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

leaderRouter.route('/:leaderId')

.get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req,res,next){
    Leadership.findById(req.params.leaderId, function(err, leader) {
        if (err) throw err;
        res.json(leader);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    Leadership.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, {
        new: true
    }, function(err, leader) {
        if (err) throw err;
        res.json(leader);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    Leadership.findByIdAndRemove(req.params.leaderId, function(err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = leaderRouter;
