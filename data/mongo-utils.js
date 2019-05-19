const mongodb = require('mongodb');

const url = "mongodb://localhost:27017/";
const dbname = "db";

module.exports = {
    findAll : (name) => {
        return collection(name, collection => collection.find({}).toArray());
    },
        
    findOne : (name, id) => {
        return collection(name, collection => collection.findOne({_id: new mongodb.ObjectID(id)}));
    },

    insert : (name, entity) => {
        return collection(name, collection => collection.insert(entity));
    },

    update : (name, id, entity) => {
        return collection(name, collection => collection.updateOne({_id: new mongodb.ObjectID(id)}, {$set: entity}));
    },
        
    delete : (name, id) => {
        return collection(name, collection => collection.remove({_id: new mongodb.ObjectID(id)}));
    },

    deleteAll : (name) => {
        return db(db => db.dropCollection(name));
    }
}

function db(callback) {
    return mongodb.MongoClient.connect(url).then(client => {
        return callback(client.db(dbname));
    });  
}

function collection(name, callback) {
    return mongodb.MongoClient.connect(url).then(client => {
        const collection = client.db(dbname).collection(name);
        return callback(collection);
    });  
}