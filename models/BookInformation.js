const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookInformationSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  Order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  Payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'running', 'Success'],
    default: 'Pending'
  }
});

module.exports = mongoose.model('BookInformation', BookInformationSchema);