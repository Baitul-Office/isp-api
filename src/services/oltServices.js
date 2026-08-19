const oltRepository = require("../repositories/oltRepository");


// Get all
const getAllOLTs = async () => {

    return await oltRepository.getAll();

};


// Get by ID
const getOLTById = async (id) => {

    if (!id) {
        throw new Error("OLT ID is required");
    }

    const olt = await oltRepository.getById(id);

    if (!olt) {
        throw new Error("OLT not found");
    }

    return olt;
};


// Create
const createOLT = async (data) => {

    if (!data.name || data.name.trim() === "") {
        throw new Error("OLT name is required");
    }

    if (!data.oltcode || data.oltcode.trim() === "") {
        throw new Error("OLT code is required");
    }

    if (
        data.ponportcount !== undefined &&
        data.ponportcount !== null &&
        data.ponportcount < 0
    ) {
        throw new Error("PON port count cannot be negative");
    }

    const id = await oltRepository.create(data);

    return await oltRepository.getById(id);
};


// Update
const updateOLT = async (id, data) => {

    if (!id) {
        throw new Error("OLT ID is required");
    }

    if (!data.name || data.name.trim() === "") {
        throw new Error("OLT name is required");
    }

    if (!data.oltcode || data.oltcode.trim() === "") {
        throw new Error("OLT code is required");
    }

    const existing = await oltRepository.getById(id);

    if (!existing) {
        throw new Error("OLT not found");
    }

    await oltRepository.update(id, data);

    return await oltRepository.getById(id);
};


// Delete
const deleteOLT = async (id) => {

    if (!id) {
        throw new Error("OLT ID is required");
    }

    const existing = await oltRepository.getById(id);

    if (!existing) {
        throw new Error("OLT not found");
    }

    await oltRepository.remove(id);

    return true;
};


module.exports = {
    getAllOLTs,
    getOLTById,
    createOLT,
    updateOLT,
    deleteOLT
};