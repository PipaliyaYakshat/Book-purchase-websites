var express = require('express');
var router = express.Router();
const FC = require('../controllers/Feedback')

/* GET home page. */
router.post('/', FC.createFeedback);
router.get('/find/:id', FC.getFeedbackById);
router.get('/', FC.getAllFeedbacks);
router.patch('/:id', FC.updateFeedback);
router.delete('/:id', FC.deleteFeedback);
module.exports = router;
