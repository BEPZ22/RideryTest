const tradesModel = require('../models/trades');

const createTrade = async (req, res) => {
    const type = req.body.type;
    const user_id = req.body.user_id;
    const symbol = req.body.symbol;
    const shares = req.body.shares;
    const price = req.body.price;
    const timestamp = req.body.timestamp;

    const typeTrades = ["sell", "buy"];
    
    if (shares < 0 || shares > 100){
        res.status(400).send({
            "message": "This trade is not in the accepted range"
        });
    }
  
    if (!typeTrades.includes(type)){
        res.status(400).send({
            "message": "This type of transaction is not acceptable"
        });
    }

    try {
        const trade = await tradesModel.create({
            type:type,
            user_id: user_id,
            symbol: symbol,
            shares: shares,
            price: price,
            timestamp: timestamp
        });

        res.status(201).send(trade);

    } catch (err) {
        res.status(500).send({"message": err.message});
    }
};

const getTradeById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const trade = await tradesModel.findOne({ _id: id });
        if (!trade){
            res.status(404).send({
                "message": `The trade with the id ${id} is not found`
            });
        }
        
        res.status(200).send(trade);
    } catch (err) {
        res.status(500).send({"message": err.message});
    }
};

const getTrades = async (req, res) => {
    const { type, user_id } = req.query;
    
    try {
        if (type || user_id){
            
            const trades = await tradesModel.find({
                $or:[
                    {"type":type},
                    {"user_id":user_id}
                ]
            });
            
            res.status(200).send(trades);
        }

        const trades = await tradesModel.find();
        res.status(200).send(trades);
    } catch (err) {
        res.status(500).send({"message": err.message});
    }
};

const errorTrade = async (req, res) => {

    res.status(405).send({
        "message": "This API does not allow to update or delete any trade value"
    });
};

module.exports = {
    createTrade,
    getTradeById,
    getTrades,
    errorTrade
}