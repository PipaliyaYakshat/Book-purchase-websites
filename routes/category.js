var express = require('express');
var router = express.Router();
let CC = require('../controllers/category')

/* GET home page. */
router.post('/', CC.create);
router.get('/find/:id', CC.find);
router.get('/', CC.viewall);
router.patch('/:id', CC.update);
router.delete('/:id', CC.delete);

module.exports = router;
