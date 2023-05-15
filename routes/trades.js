const express = require('express');
const router = express.Router();
const tradeController =  require('../controllers/trades');

router.post('/', tradeController.createTrade);
router.get('/', tradeController.getTrades);
router.get('/:id', tradeController.getTradeById);

router.put('/:id', tradeController.errorTrade);
router.patch('/:id', tradeController.errorTrade);
router.delete('/:id', tradeController.errorTrade);

module.exports = router;
