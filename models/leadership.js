// JavaScript File leadership.js - Week 2 Task 3
// JavaScript File promotions.js Week 2 Task 2

/* Sample Document
{
      "name": "Peter Pan",
      "image": "images/alberto.png",
      "designation": "Chief Epicurious Officer",
      "abbr": "CEO",
      "description": "Our CEO, Peter, . . ."
}
********** */

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//
// Will add the Currency type to the Mongoose Schema types
// NOT Required for this task
// require('mongoose-currency').loadType(mongoose);
// var Currency = mongoose.Types.Currency;

// create a schema
var leadershipSchema = new Schema({ 
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }, 
}, 
{
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Leaderships = mongoose.model('Leadership', leadershipSchema);

// make this available to our Node applications
module.exports = Leaderships;