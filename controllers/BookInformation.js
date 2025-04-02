const BM = require('../models/BookInformation');

exports.createBookInformation = async (req, res) => {
    try {
        if (!req.body.status) {
            req.body.status = 'Pending';
        }
        const createdData = await BM.create(req.body);

        res.status(201).json({
            status: "success",
            message: "Book information created successfully!",
            createdData
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.getAllBookInformations = async (req, res) => {
    try {
        const bookInformations = await BM.find()
            .populate({
                path: 'user',
                select: 'name email'
            })
            .populate({
                path: 'Order',
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
            })
            .populate({
                path: 'Payment',
                select: 'amount buyNow status paymentDate'
            });

        res.status(200).json({
            status: "success",
            message: "Book information fetched successfully!",
            bookInformations
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.getBookInformationById = async (req, res) => {
    try {
        const bookInformation = await BM.findById(req.params.id)
            .populate({
                path: 'user',
                select: 'name email'
            })
            .populate({
                path: 'Order',
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
            })
            .populate({
                path: 'Payment',
                select: 'amount buyNow status paymentDate'
            });

        if (!bookInformation) {
            return res.status(404).json({ message: 'Book information not found' });
        }

        res.status(200).json({
            status: "success",
            message: "Book information fetched successfully!",
            bookInformation
        });

    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.updateBookInformation = async (req, res) => {
    try {
        const updatedBookInformation = await BM.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedBookInformation) {
            return res.status(404).json({
                status: "fail",
                message: "Book information not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Book information updated successfully!",
            updatedBookInformation
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.deleteBookInformation = async (req, res) => {
    try {
        const deletedBookInformation = await BM.findByIdAndDelete(req.params.id);

        if (!deletedBookInformation) {
            return res.status(404).json({
                status: "fail",
                message: "Book information not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Book information deleted successfully!"
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
};
