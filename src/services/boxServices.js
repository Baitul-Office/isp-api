const repository = require("../repositories/boxRepository");

async function getBoxes({ page = 1, limit = 10, search = "" }) {

    page = parseInt(page);
    limit = parseInt(limit);

    if (isNaN(page) || page < 1) {
        page = 1;
    }

    if (isNaN(limit) || limit < 1) {
        limit = 10;
    }

    // Prevent unnecessarily large requests
    if (limit > 100) {
        limit = 100;
    }

    const result = await repository.getBoxes({
        page,
        limit,
        search
    });

    const totalPages = Math.ceil(result.total / limit);

    return {
        data: result.rows,
        pagination: {
            page,
            limit,
            total: result.total,
            totalPages
        }
    };
}

async function getBoxById(id) {
    return await repository.getBoxById(id);
}

async function createBox(data) {

    if (!data.subzoneid) {
        throw new Error("Subzone is required");
    }

    if (!data.name || data.name.trim() === "") {
        throw new Error("Box name is required");
    }

    return await repository.createBox(data);
}

async function updateBox(id, data) {

    if (!id) {
        throw new Error("Box ID is required");
    }

    if (!data.subzoneid) {
        throw new Error("Subzone is required");
    }

    if (!data.name || data.name.trim() === "") {
        throw new Error("Box name is required");
    }

    return await repository.updateBox(id, data);
}

async function deleteBox(id, updatedby) {

    if (!id) {
        throw new Error("Box ID is required");
    }

    return await repository.deleteBox(id, updatedby);
}

module.exports = {
    getBoxes,
    getBoxById,
    createBox,
    updateBox,
    deleteBox
};