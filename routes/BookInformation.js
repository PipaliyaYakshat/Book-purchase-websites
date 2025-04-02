var express = require('express');
var router = express.Router();
var BC = require('../controllers/BookInformation')

/* GET home page. */
router.post('/', BC.createBookInformation);
router.get('/find/:id', BC.getBookInformationById);
router.get('/', BC.getAllBookInformations);
router.patch('/:id', BC.updateBookInformation);
router.delete('/:id', BC.deleteBookInformation);

module.exports = router;
