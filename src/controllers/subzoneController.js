const service = require("../services/subzoneServices");

async function getSubzones(req, res, next) {

    try {

        const data = await service.getSubzones();

        res.json({
            success: true,
            data: data
        });

    } catch (err) {
        next(err);
    }
}


async function getSubzoneById(req, res, next) {

    try {

        const { id } = req.params;

        const data = await service.getSubzoneById(id);

        res.json({
            success: true,
            data: data
        });

    } catch (err) {
        next(err);
    }
}


async function getSubzoneByZoneId(req, res, next) {
    try {

        const { zoneid } = req.params;

        const data = await service.getSubzoneByZoneId(zoneid);

        res.json({
            success: true,
            data: data
        });

    } catch (err) {
        next(err);
    }
}


async function createSubzone(req, res, next) {

    try {

        const id = await service.createSubzone(req.body);

        res.status(201).json({
            success: true,
            message: "Subzone created successfully",
            id: id
        });

    } catch (err) {
        next(err);
    }
}


async function updateSubzone(req, res, next) {

    try {

        const { id } = req.params;

        await service.updateSubzone(id, req.body);

        res.json({
            success: true,
            message: "Subzone updated successfully"
        });

    } catch (err) {
        next(err);
    }
}


async function deleteSubzone(req, res, next) {

    try {

        const { id } = req.params;

        await service.deleteSubzone(id);

        res.json({
            success: true,
            message: "Subzone deleted successfully"
        });

    } catch (err) {
        next(err);
    }
}


module.exports = {
    getSubzones,
    getSubzoneById,
    getSubzoneByZoneId,
    createSubzone,
    updateSubzone,
    deleteSubzone
};