var express = require('express');
var router = express.Router();
const OC = require('../controllers/order')

/* GET home page. */
router.post('/', OC.createOrder);
router.get('/find/:id', OC.getOrderById);
router.get('/', OC.getAllOrders);
router.patch('/:id', OC.updateOrder);
router.delete('/:id', OC.deleteOrder);


module.exports = router;
