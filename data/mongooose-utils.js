const mongodb = require('mongodb');
const mongoose = require('mongoose');
const Dishes = require('../model/dishes');

const url = "mongodb://localhost:27017/";
mongoose.connect(url)
.then(db => {
    console.log("Connected correctly to sever")
}, error => {
    console.error('Can not connect to server');
    console.log(error)
});

mongoose.connect
module.exports = {
    findAll : (name) => {
        return Dishes.find({});
    },
        
    findOne : (name, id) => {
        return Dishes.findById(id);
    },

    insert : (name, entity) => {
        return Dishes.create(entity);
    },

    update : (name, id, entity) => {
        return Dishes.findByIdAndUpdate(id, {$set: entity}, {new: true});
    },
        
    delete : (name, id) => {
        return Dishes.findByIdAndRemove(new mongodb.ObjectID(id));
    },

    deleteAll : (name) => {
        return Dishes.remove({});
    }
}