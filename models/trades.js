// Uncomment the code below to use Sequelize ORM
// const {Sequelize} = require("sequelize");
// const sequelize = new Sequelize("sqlite::memory:");

// Uncomment the code below to use Mongoose ORM
const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

// Insert your model definition below
const tradesSchema = new mongoose.Schema({
    type: {type: String, require: true},
    user_id: {type: Number, require: true},
    symbol: {type: String, require: true},
    shares: {type: Number, require: true},
    price: {type: Number, require: true},
    timestamp: {type: Number}
});


// tradesSchema.plugin(AutoIncrement, {inc_field: '_id'});

module.exports =  mongoose.model("trades", tradesSchema);