const mongodb = require('mongodb');
const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/";
mongoose.connect(url)
.then(db => {
    console.log("Connected correctly to sever")
}, error => {
    console.error('Can not connect to server');
    console.log(error)
});

module.exports.create = (schema) => {
    return {
        findAll : (name) => {
            return schema.find({});
        },
            
        findOne : (name, id) => {
            return schema.findById(id);
        },
    
        insert : (name, entity) => {
            return schema.create(entity);
        },
    
        update : (name, id, entity) => {
            return schema.findByIdAndUpdate(id, {$set: entity}, {new: true});
        },
            
        delete : (name, id) => {
            return schema.findByIdAndRemove(new mongodb.ObjectID(id));
        },
    
        deleteAll : (name) => {
            return schema.remove({});
        }
    };
};