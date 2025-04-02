const BM = require('../models/books')

exports.createData = async (req, res) => {
    try {
        
        const books = req.body;

        if (req.files && req.files.length > 0) {
            const fileNames = req.files.map(file => file.filename);
            books.image = fileNames;
        }

        await BM.create(books);
        res.status(201).json({
            status: "success",
            message: "Books data created successfully",
            data: books,
        });

    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};


exports.allBooks = async (req, res) => {
    try {

        const viewalldata = await BM.find().populate([
            { path: 'user' },
            { path: 'Category' }
        ]);

        res.status(201).json({
            status: "success",
            message: "Books data read successfully",
            data: viewalldata
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};


exports.oneBook = async (req, res) => {
    try {
        const booksdata = await BM.findById(req.params.id).populate([
            { path: 'user' },
            { path: 'Category' }
        ]);
        if (!booksdata) {
            return res.status(404).json({ message: 'Books data not found' });
        }
        res.status(201).json({
            status: "success",
            message: "Books data read successfully",
            data: booksdata,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};


exports.updateBook = async (req, res) => {
    try {
        const updatedata = await BM.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedata) {
            return res.status(404).json({ message: 'Books data not found' });
        }
        res.status(201).json({
            status: "success",
            message: "Books data update successfully",
            data: updatedata,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};



exports.deleteBook = async (req, res) => {
    try {
        const deletedata = await BM.findByIdAndDelete(req.params.id);
        if (!deletedata) {
            return res.status(404).json({ message: 'Books data not found' });
        }
        res.status(201).json({
            status: "success",
            message: "Books data delete successfully",
            data: deletedata,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};

