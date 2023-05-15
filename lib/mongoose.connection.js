require('dotenv').config()
const mongoose = require('mongoose');
const mdbMS = require('mongodb-memory-server');
const ConnectionBase = require('./connection-base');
const mongoServer = new mdbMS.MongoMemoryServer();
const Trades = require('../models/trades');
mongoose.Promise = Promise;
const AutoIncrementFactory = require('mongoose-sequence');
const uri = process.env.MONGO_URI_CONNECTION;

const connect = mongoose.connect(
    uri,
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useFindAndModify : false , 
        useCreateIndex: true
    }
);

// (promise) => {
//     return mongoServer.getUri(uri)
//         .then((mongoUri) => {
//             const mongooseOpts = {
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true
//             };

//             mongoose.connect(mongoUri, mongooseOpts);

//             mongoose.connection.on('error', (e) => {
//                 promise = null;
//                 if (e.message.code === 'ETIMEDOUT') {
//                     console.log(e);
//                     mongoose.connect(mongoUri, mongooseOpts);
//                 }
//                 console.log(e);
//             });

//             mongoose.connection.once('open', () => {
//                 promise = null;
//                 console.log(`MongoDB successfully connected to ${mongoUri}`);
//             });

//             return mongoose;
//         }).catch( err => {
//             console.log(err)
//         });
// }

class MongooseConnection extends ConnectionBase {

    getConnection() {
        // if (this.promise) {
        //     return this.promise;
        // }
        // this.promise = connect(this.promise)
        //     .then(connection => {
        //         this.connection = connection;
        //         return connection;
        //     });
        
        return connect
    }

    async clearDatabase() {
        return Trades.deleteMany();
    }

    async closeConnection() {
        return this.connection.connection.close();
    }
}

module.exports = MongooseConnection;
