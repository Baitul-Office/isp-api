const service = require("../services/branchService");

async function getBranches(req, res, next) {

    try {

        const data = await service.getBranches();

        res.json(data);

    } catch (err) {

        next(err);

    }
}

async function getBranch(req, res, next) {

    try {

        const data = await service.getBranch(
            req.params.id
        );

        res.json(data);

    } catch (err) {

        next(err);

    }
}

async function createBranch(req, res, next) {

    try {

        const id = await service.createBranch(
            req.body
        );

        res.status(201).json({
            message: "User created",
            id
        });

    } catch (err) {

        next(err);

    }
}

module.exports = {
    getBranches,
    getBranch,
    createBranch
};