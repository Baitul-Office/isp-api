const service = require("../services/boxServices");

async function getBoxes(req, res, next) {

    try {

        const {
            page = 1,
            limit = 10,
            search = ""
        } = req.query;

        const result = await service.getBoxes({
            page,
            limit,
            search
        });

        res.json({
            success: true,
            message: "Boxes retrieved successfully",
            ...result
        });

    } catch (err) {
        next(err);
    }
}

async function getBoxById(req, res, next) {

    try {

        const { id } = req.params;

        const data = await service.getBoxById(id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Box not found"
            });
        }

        res.json({
            success: true,
            data
        });

    } catch (err) {
        next(err);
    }
}

async function createBox(req, res, next) {

    try {

        const result = await service.createBox(req.body);

        res.status(201).json({
            success: true,
            message: "Box created successfully",
            data: {
                id: result.insertId
            }
        });

    } catch (err) {
        next(err);
    }
}

async function updateBox(req, res, next) {

    try {

        const { id } = req.params;

        const result = await service.updateBox(id, req.body);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Box not found"
            });
        }

        res.json({
            success: true,
            message: "Box updated successfully"
        });

    } catch (err) {
        next(err);
    }
}

async function deleteBox(req, res, next) {

    try {

        const { id } = req.params;
        const { updatedby } = req.body;

        const result = await service.deleteBox(id, updatedby);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Box not found"
            });
        }

        res.json({
            success: true,
            message: "Box deactivated successfully"
        });

    } catch (err) {
        next(err);
    }
}

module.exports = {
    getBoxes,
    getBoxById,
    createBox,
    updateBox,
    deleteBox
};