var express = require('express');
var router = express.Router();
const PC = require('../controllers/payment')

/* GET home page. */
router.post('/', PC.createPayment);
router.get('/find/:id', PC.getPaymentById);
router.get('/', PC.getAllPayments);
router.patch('/:id', PC.updatePayment);
router.delete('/:id', PC.deletePayment);

module.exports = router;
