const repository = require("../repositories/subzoneRepository");

async function getSubzones() {
    return await repository.getAll();
}

async function getSubzoneById(id) {

    const data = await repository.getById(id);

    if (!data) {
        const error = new Error("Subzone not found");
        error.statusCode = 404;
        throw error;
    }

    return data;
}

async function getSubzoneByZoneId(id) {

    if (!id) {
        const error = new Error("Zone ID is required");
        error.statusCode = 400;
        throw error;
    }

    const data = await repository.getSubzoneByZoneId(id);

    if (data.length === 0) {
        const error = new Error("No subzones found for this zone");
        error.statusCode = 404;
        throw error;
    }

    return data;
}

async function createSubzone(data) {

    if (!data.zoneid) {
        const error = new Error("Zone is required");
        error.statusCode = 400;
        throw error;
    }

    if (!data.name || data.name.trim() === "") {
        const error = new Error("Subzone name is required");
        error.statusCode = 400;
        throw error;
    }

    return await repository.create(data);
}

async function updateSubzone(id, data) {

    const existing = await repository.getById(id);

    if (!existing) {
        const error = new Error("Subzone not found");
        error.statusCode = 404;
        throw error;
    }

    if (!data.zoneid) {
        const error = new Error("Zone is required");
        error.statusCode = 400;
        throw error;
    }

    if (!data.name || data.name.trim() === "") {
        const error = new Error("Subzone name is required");
        error.statusCode = 400;
        throw error;
    }

    return await repository.update(id, data);
}

async function deleteSubzone(id) {

    const existing = await repository.getById(id);

    if (!existing) {
        const error = new Error("Subzone not found");
        error.statusCode = 404;
        throw error;
    }

    return await repository.remove(id);
}

module.exports = {
    getSubzones,
    getSubzoneById,
    getSubzoneByZoneId,
    createSubzone,
    updateSubzone,
    deleteSubzone
};