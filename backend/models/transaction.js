const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TransactionSchema = new mongoose.Schema({
    transaction_id:{
        type:String
    },
    transaction_amount:{
        type:String
    },
});
module.exports = mongoose.model('Transactions', TransactionSchema);