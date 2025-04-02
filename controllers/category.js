const CM = require('../models/category')

exports.create = async function (req, res, body) {
        try {


            const createdata = await CM.create(req.body)

            res.status(201).json({
                status: "success",
                message: "categories created successfully !",
                createdata
            })
        } catch (error) {
            res.status(404).json({
                status: "fail",
                message: error.message
            })
        }
}
exports.find = async function (req, res, body) {
    try {

        let logindata = await CM.findById(req.params.id)

        if (!logindata) {
            res.status(404).json({
                status: "Fail",
                message: "data not found"
            })
        }

        res.status(201).json({
            status: "successfull",
            message: "categories data login successfully",
            logindata
        })

    } catch (error) {
        res.status(201).json({
            status: "Fail",
            message: error.message,
        })
    }
}
exports.viewall = async function (req, res, body) {
    try {
        const viewdata = await CM.find()

        res.status(201).json({
            status: "success",
            message: "categories data read successfully !",
            viewdata
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}
exports.update = async function (req, res, body) {
    try {
        const updatedata = await CM.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.status(201).json({
            status: "success",
            message: "categories data update successfully !",
            updatedata
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}
exports.delete = async function (req, res, body) {
    try {
        const deletedata = await CM.findByIdAndDelete(req.params.id)

        res.status(201).json({
            status: "success",
            message: "categories data delete successfully !",
            deletedata
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}