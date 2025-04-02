const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    order: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Order',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    buyNow: {
        type: Boolean,
        enum: ['false', 'true'],
        default: 'false'
    },
    paymentDate: {
        type: Date,
        required: true,
        default: Date.now
    },
});

module.exports = mongoose.model('Payment', paymentSchema);