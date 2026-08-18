const service = require("../services/popServices");


async function getAll(req, res, next) {

    try {

        const data = await service.getAll();

        res.json({
            success: true,
            data: data
        });

    } catch (err) {
        next(err);
    }
}


async function getById(req, res, next) {

    try {

        const { id } = req.params;

        const data = await service.getById(id);

        res.json({
            success: true,
            data: data
        });

    } catch (err) {
        next(err);
    }
}


async function create(req, res, next) {

    try {

        const data = await service.create(req.body);

        res.status(201).json({
            success: true,
            message: "POP created successfully",
            data: data
        });

    } catch (err) {
        next(err);
    }
}


async function update(req, res, next) {

    try {

        const { id } = req.params;

        const data = await service.update(id, req.body);

        res.json({
            success: true,
            message: "POP updated successfully",
            data: data
        });

    } catch (err) {
        next(err);
    }
}


async function remove(req, res, next) {

    try {

        const { id } = req.params;

        const data = await service.remove(id);

        res.json({
            success: true,
            message: data.message
        });

    } catch (err) {
        next(err);
    }
}


async function getByBranchId(req, res, next) {

    try {

        const { id } = req.params;

        const data = await service.getByBranchId(id);

        res.json({
            success: true,
            data: data
        });

    } catch (err) {
        next(err);
    }
}


module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    getByBranchId
};