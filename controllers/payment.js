const nodemailer = require('nodemailer');
const PM = require('../models/payment');
const UM = require('../models/user');
const OM = require('../models/order')

exports.createPayment = async (req, res) => {
    try {
        if (!Array.isArray(req.body.order)) {
            return res.status(400).json({
                status: "fail",
                message: "'order' field must be an array of order IDs."
            });
        }

        const orders = await OM.find({ '_id': { $in: req.body.order } }).populate('book');

        if (!orders || orders.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Orders not found."
            });
        }


        let totalPrice = 0;
        orders.forEach(order => {
            if (order && order.book) {
                totalPrice += order.quantity * order.book.price;
            }
        });

        if (req.body.amount != totalPrice) {
            return res.status(400).json({
                status: "fail",
                message: `Amount mismatch: expected ₹${totalPrice} but got ₹${req.body.amount}`
            });
        }

        const paymentData = { ...req.body, amount: totalPrice };

        if (!req.body.status) {
            req.body.status = 'Pending';
        }
        if (req.body.buyNow === undefined) {
            req.body.buyNow = false;
        }

        const createdPayment = await PM.create(paymentData);

        const user = await UM.findById(req.body.user);

        if (user) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'pipaliyayakshat2024.katargam@gmail.com',
                    pass: 'ghswudkgrjiuoanf'
                }
            });

            const mailOptions = {
                from: 'pipaliyayakshat2024.katargam@gmail.com',
                to: user.email,
                subject: 'Payment Confirmation',
                text: `Dear ${user.name},\n\nYour payment has been successfully processed. Payment details: \nTotal Amount: ₹${totalPrice}\n\nThank you for your payment! Your orders have been processed successfully.`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending email: ', error);
                    return res.status(500).json({
                        status: "fail",
                        message: "Payment created, but email could not be sent."
                    });
                }
            });
        }

        res.status(201).json({
            status: "success",
            message: "Payment created successfully!",
            createdPayment
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "fail",
            message: error.message || "Internal server error"
        });
    }
};

exports.getAllPayments = async (req, res) => {
    try {
        const payments = await PM.find()
            .populate({
                path: 'user',
                select: 'name email'
            })
            .populate({
                path: 'order',
                populate: [
                    {
                        path: 'book',
                        select: 'title author price'
                    },
                    {
                        path: 'category',
                        select: 'subcategories'
                    }
                ]
            });

        res.status(200).json({
            status: "success",
            message: "Payments retrieved successfully!",
            payments
        });

    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.getPaymentById = async (req, res) => {
    try {
        const payment = await PM.findById(req.params.id)
            .populate({
                path: 'user',
                select: 'name email'
            })
            .populate({
                path: 'order',
                populate: [
                    {
                        path: 'book',
                        select: 'title author price'
                    },
                    {
                        path: 'category',
                        select: 'subcategories'
                    }
                ]
            });

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.status(200).json({
            status: "success",
            message: "Payment retrieved successfully!",
            payment
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.updatePayment = async (req, res) => {
    try {
        const paymentupdate = await PM.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!paymentupdate) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(201).json({
            status: "success",
            message: "Payment updated successfully!",
            paymentupdate
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.deletePayment = async (req, res) => {
    try {
        const paymentdelete = await PM.findByIdAndDelete(req.params.id);
        if (!paymentdelete) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(201).json({
            status: "success",
            message: "Payment deleted successfully!",
            paymentdelete
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        });
    }
};
