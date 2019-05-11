const mongodb = require('mongodb');

const url = "mongodb://localhost:27017/";
const dbname = "db";

module.exports = {
    findAll : (name) => {
        return collection(name, collection => collection.find({}).toArray())
    },
        
    findOne : (name, id) => {
        return collection(name, collection => collection.findOne({_id: new mongodb.ObjectID(id)}));
    },

    insert : (name, data) => {
        return collection(name, collection => collection.insert(data));
    },

    update : (name, id, data) => {
        return collection(name, collection => collection.updateOne({_id: new mongodb.ObjectID(id)}, {$set: data}));
    },
        
    delete : (name, id) => {
        return collection(name, collection => collection.remove({_id: new mongodb.ObjectID(id)}));
    },

    deleteAll : (name) => {
        return db(name, db => db.dropCollection(name));
    }
}

function db(name, callback) {
    return mongodb.MongoClient.connect(url).then(client => {
        return callback(client.db(dbname));
    }).catch(error => {
        console.log(error);
    });  
}

function collection(name, callback) {
    return mongodb.MongoClient.connect(url).then(client => {
        const collection = client.db(dbname).collection(name);
        return callback(collection);
    }).catch(error => {
        console.log(error);
    });  
}