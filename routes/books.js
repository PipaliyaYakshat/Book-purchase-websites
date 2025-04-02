var express = require('express');
var router = express.Router();
var BC = require('../controllers/books')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.filename)
  }
})

const upload = multer({ storage: storage })

router.post('/', upload.array('image', 2), BC.createData);
router.get('/find/:id', BC.oneBook)
router.get('/', BC.allBooks)
router.patch('/:id', BC.updateBook)
router.delete('/:id', BC.deleteBook)


module.exports = router;
