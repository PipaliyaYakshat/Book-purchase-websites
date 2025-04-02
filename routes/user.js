var express = require('express');
var router = express.Router();
let UC = require('../controllers/user')
let middleware = require('../middleware/jwt')

/* GET home page. */
router.post('/', UC.signup);
router.post('/login', middleware.Auth, UC.login);
router.get('/', middleware.Auth, UC.viewall);
router.patch('/:id', middleware.Auth, UC.update);
router.delete('/:id', middleware.Auth, UC.delete);

module.exports = router;
