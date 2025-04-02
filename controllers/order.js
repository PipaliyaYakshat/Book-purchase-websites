const OM = require('../models/order');
const mongoose = require('mongoose');

exports.createOrder = async (req, res) => {
    try {
        const book = await mongoose.model('Book').findById(req.body.book);

        if (!book) {
            return res.status(404).json({
                status: "fail",
                message: "Book not found",
            });
        }

        if (req.body.quantity > book.stock) {
            return res.status(400).json({
                status: "fail",
                message: `Stock not available. Only ${book.stock} books are available.`,
            });
        }

        if (!req.body.status) {
            req.body.status = 'Pending';
        }

        const createdOrder = await OM.create(req.body);

        book.stock -= req.body.quantity;
        await book.save();

        res.status(201).json({
            status: "success",
            message: "Order created successfully!",
            createdOrder,
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await OM.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: 'book',
                    foreignField: '_id',
                    as: 'book'
                }
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            {
                $unwind: {
                    path: '$user',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: '$book',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: '$category',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    totalPrice: { $multiply: ['$book.price', '$quantity'] }
                }
            }
        ]);

        res.status(200).json({
            status: 'success',
            message: 'Orders fetched successfully!',
            data: orders
        });
    } catch (error) {
        console.error('Error in getAllOrders:', error);
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const userId = req.query.userId;

        if (!orderId) {
            return res.status(400).json({
                status: "fail",
                message: "Order ID is required",
            });
        }

        const orders = await OM.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(orderId),
                    ...(userId && { user: new mongoose.Types.ObjectId(userId) })
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'userDetails',
                },
            },
            {
                $unwind: {
                    path: '$userDetails',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'books',
                    localField: 'book',
                    foreignField: '_id',
                    as: 'book',
                },
            },
            {
                $unwind: {
                    path: '$book',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $addFields: {
                    totalPrice: { $multiply: ['$book.price', '$quantity'] },
                },
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category',
                },
            },
            {
                $unwind: {
                    path: '$category',
                    preserveNullAndEmptyArrays: true,
                },
            },
        ]);

        if (!orders || orders.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: 'Order not found or does not belong to the specified user',
            });
        }

        res.status(200).json({
            status: "success",
            message: "Order fetched successfully!",
            data: orders[0],
        });
    } catch (error) {
        console.error('Error in getOrderById:', error);
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};
exports.deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;

        if (!orderId) {
            return res.status(400).json({
                status: "fail",
                message: "Order ID is required",
            });
        }

        const order = await OM.findById(orderId);

        if (!order) {
            return res.status(404).json({
                status: "fail",
                message: "Order not found",
            });
        }

        const book = await mongoose.model('Book').findById(order.book);
        if (book) {
            book.stock += order.quantity;
            await book.save();
        }


        await OM.findByIdAndDelete(orderId);

        res.status(200).json({
            status: "success",
            message: "Order deleted successfully!",
        });
    } catch (error) {
        console.error('Error in deleteOrder:', error);
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};
exports.updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;

        if (!orderId) {
            return res.status(400).json({
                status: "fail",
                message: "Order ID is required",
            });
        }

        const order = await OM.findById(orderId);

        if (!order) {
            return res.status(404).json({
                status: "fail",
                message: "Order not found",
            });
        }

        const book = await mongoose.model('Book').findById(req.body.book);
        if (!book) {
            return res.status(404).json({
                status: "fail",
                message: "Book not found",
            });
        }


        if (req.body.quantity && req.body.quantity > book.stock) {
            return res.status(400).json({
                status: "fail",
                message: `Stock not available. Only ${book.stock} books are available.`,
            });
        }


        if (req.body.quantity) {

            book.stock += order.quantity - req.body.quantity;
        }


        if (req.body.status) {
            order.status = req.body.status;
        }


        if (req.body.quantity) {
            order.quantity = req.body.quantity;
        }

        await book.save();

        const updatedOrder = await order.save();

        res.status(200).json({
            status: "success",
            message: "Order updated successfully!",
            updatedOrder,
        });
    } catch (error) {
        console.error('Error in updateOrder:', error);
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};

