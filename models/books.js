const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   Category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
   },
   title: {
      type: String,
      required: true
   },
   author: {
      type: String,
      required: true
   },
   image: {
      type: [String],
      require: true
   },
   publishedDate: {
      type: Date,
      required: true,
      validate: {
         validator: function (value) {
            return value <= Date.now();
         },
         message: 'Published date cannot be in the future'
      }
   },
   price: {
      type: Number,
      required: true
   },
   stock:
   {
      type: Number,
      required: true
   },
   pages: {
      type: Number,
      require: true
   },
   language: {
      type: [String],
      require: true
   },
   description: {
      type: String,
      require: true
   }
});

module.exports = mongoose.model('Book', BookSchema);