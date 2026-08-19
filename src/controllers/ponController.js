const ponService = require("../services/ponServices");


// GET /api/pon
const getAll = async (req, res) => {

    try {

        const {
            page = 1,
            limit = 10,
            search = ""
        } = req.query;


        const result = await ponService.getAll(
            page,
            limit,
            search
        );


        return res.status(200).json({
            success: true,
            message: "PONs loaded successfully",
            ...result
        });

    } catch (error) {

        console.error("Get PONs error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET /api/pon/:id
const getById = async (req, res) => {

    try {

        const { id } = req.params;

        const pon = await ponService.getById(id);


        return res.status(200).json({
            success: true,
            message: "PON loaded successfully",
            data: pon
        });

    } catch (error) {

        console.error("Get PON error:", error);

        const statusCode =
            error.message === "PON not found"
                ? 404
                : 400;


        return res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};


// POST /api/pon
const create = async (req, res) => {

    try {

        const pon = await ponService.create(req.body);


        return res.status(201).json({
            success: true,
            message: "PON created successfully",
            data: pon
        });

    } catch (error) {

        console.error("Create PON error:", error);

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// PUT /api/pon/:id
const update = async (req, res) => {

    try {

        const { id } = req.params;

        const pon = await ponService.update(
            id,
            req.body
        );


        return res.status(200).json({
            success: true,
            message: "PON updated successfully",
            data: pon
        });

    } catch (error) {

        console.error("Update PON error:", error);

        const statusCode =
            error.message === "PON not found"
                ? 404
                : 400;


        return res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};


// DELETE /api/pon/:id
const remove = async (req, res) => {

    try {

        const { id } = req.params;

        await ponService.remove(id);


        return res.status(200).json({
            success: true,
            message: "PON deleted successfully"
        });

    } catch (error) {

        console.error("Delete PON error:", error);

        const statusCode =
            error.message === "PON not found"
                ? 404
                : 400;


        return res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};