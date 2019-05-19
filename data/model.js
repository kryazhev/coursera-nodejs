const mongoose = require("mongoose");
require("mongoose-currency").loadType(mongoose);
const Schema = mongoose.Schema;
const Currency = mongoose.Types.Currency;

const commentSchema = new Schema({
    rating: {
        type : Number,
        min: 1,
        max: 5,
        required: true
    },
    author: {
        type : String,
        required: true
    }
}, {
    timestamps: true
});

const dishSchema = new Schema({
    name: {
        type : String,
        required: true,
        unique: true
    },
    description: {
        type : String,
        required: true
    },
    comments: [commentSchema]
}, {
    timestamps: true
});

const leaderSchema = new Schema({
    name: {
        type : String,
        required: true,
        unique: true
    },
    image: {
        type : String,
    },
    description: {
        type : String,
        required: true
    },
}, {
    timestamps: true
});

const promotionSchema = new Schema({
    name: {
        type : String,
        required: true,
        unique: true
    },
    image: {
        type : String,
    },
    label: {
        type : String,
    },
    price: {
        type : Currency,
    },    
    description: {
        type : String,
        required: true
    },
}, {
    timestamps: true
});


var Dishes = mongoose.model("Dish", dishSchema);
var Leaders = mongoose.model("Leader", leaderSchema);
var Promotions = mongoose.model("Promotion", promotionSchema);

module.exports.Dishes = Dishes;
module.exports.Leaders = Leaders;
module.exports.Promotions = Promotions;