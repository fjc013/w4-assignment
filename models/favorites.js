// JavaScript File promotions.js Week 2 Task 2
// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//
// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

// create a schema
var favoriteSchema = new Schema({ 
    timestamps: true,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    favoriteDishes: [{
        type: mongoose.Schema.Types,ObjectId, 
        ref:'Dishes'
     }]
}); 
/*
var favoriteSchema = new Schema({ 
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    favoriteDishes: [{type: mongoose.Schema.Types,ObjectId, ref:'Dishes'}]
    }, 
{
    timestamps: true
});
*/

// the schema is useless so far
// we need to create a model using it
var Favorites = mongoose.model('Favorite', favoriteSchema);

// make this available to our Node applications
module.exports = Favorites;