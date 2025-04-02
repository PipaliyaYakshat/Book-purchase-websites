const FM = require('../models/Feedback')

exports.createFeedback = async (req, res) => {
    try {

        const createdata = await FM.create(req.body)

        res.status(201).json({
            status: "success",
            message: "Feedback created successfully!",
            createdata
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
};

exports.getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await FM.find().populate({
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
            });
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getFeedbackById = async (req, res) => {
    try {
        const feedback = await FM.findById(req.params.id).populate({
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
            });
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        res.status(200).json(feedback);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteFeedback = async (req, res) => {
    try {
        const feedback = await FM.findByIdAndDelete(req.params.id);

        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found to delete' });
        }

        res.status(200).json({
            status: "success",
            message: "Feedback deleted successfully!"
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateFeedback = async (req, res) => {
    try {
        const feedback = await FM.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found to update' });
        }

        res.status(200).json({
            status: "success",
            message: "Feedback updated successfully!",
            feedback
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
