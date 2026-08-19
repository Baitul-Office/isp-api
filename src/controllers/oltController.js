const oltService = require("../services/oltServices");


// GET /api/olt
const getAll = async (req, res) => {

    try {

        const data = await oltService.getAllOLTs();

        res.status(200).json({
            success: true,
            data: data
        });

    } catch (error) {

        console.error("Get OLT error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET /api/olt/:id
const getById = async (req, res) => {

    try {

        const { id } = req.params;

        const data = await oltService.getOLTById(id);

        res.status(200).json({
            success: true,
            data: data
        });

    } catch (error) {

        console.error("Get OLT by ID error:", error);

        const statusCode =
            error.message === "OLT not found" ? 404 : 400;

        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};


// POST /api/olt
const create = async (req, res) => {

    try {

        const data = await oltService.createOLT(req.body);

        res.status(201).json({
            success: true,
            message: "OLT created successfully",
            data: data
        });

    } catch (error) {

        console.error("Create OLT error:", error);

        // MySQL duplicate key
        if (error.code === "ER_DUP_ENTRY") {

            return res.status(409).json({
                success: false,
                message: "OLT code already exists"
            });
        }

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// PUT /api/olt/:id
const update = async (req, res) => {

    try {

        const { id } = req.params;

        const data = await oltService.updateOLT(
            id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "OLT updated successfully",
            data: data
        });

    } catch (error) {

        console.error("Update OLT error:", error);

        if (error.code === "ER_DUP_ENTRY") {

            return res.status(409).json({
                success: false,
                message: "OLT code already exists"
            });
        }

        const statusCode =
            error.message === "OLT not found" ? 404 : 400;

        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};


// DELETE /api/olt/:id
const remove = async (req, res) => {

    try {

        const { id } = req.params;

        await oltService.deleteOLT(id);

        res.status(200).json({
            success: true,
            message: "OLT deleted successfully"
        });

    } catch (error) {

        console.error("Delete OLT error:", error);

        const statusCode =
            error.message === "OLT not found" ? 404 : 400;

        res.status(statusCode).json({
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