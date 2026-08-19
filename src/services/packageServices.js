const packageRepository = require("../repositories/packageRepository");


// Get packages
const getPackages = async (page, limit, search) => {

    page = Number(page) || 1;
    limit = Number(limit) || 10;

    if (page < 1) page = 1;
    if (limit < 1) limit = 10;

    return await packageRepository.getAllPackages({
        page,
        limit,
        search: search || ""
    });
};


// Get package by ID
const getPackageById = async (id) => {

    const packageData =
        await packageRepository.getPackageById(id);

    if (!packageData) {
        throw new Error("Package not found");
    }

    return packageData;
};


// Create package
const createPackage = async (data) => {

    if (!data.name) {
        throw new Error("Package name is required");
    }

    if (!data.code) {
        throw new Error("Package code is required");
    }

    if (data.downloadspeed === undefined) {
        throw new Error("Download speed is required");
    }

    if (data.uploadspeed === undefined) {
        throw new Error("Upload speed is required");
    }

    // Check duplicate code
    const existing =
        await packageRepository.getPackageByCode(data.code);

    if (existing) {
        throw new Error("Package code already exists");
    }

    return await packageRepository.createPackage(data);
};


// Update package
const updatePackage = async (id, data) => {

    const existing =
        await packageRepository.getPackageById(id);

    if (!existing) {
        throw new Error("Package not found");
    }

    if (!data.name) {
        throw new Error("Package name is required");
    }

    if (!data.code) {
        throw new Error("Package code is required");
    }

    // Check duplicate code
    const duplicate =
        await packageRepository.getPackageByCode(
            data.code,
            id
        );

    if (duplicate) {
        throw new Error("Package code already exists");
    }

    const affectedRows =
        await packageRepository.updatePackage(id, data);

    return affectedRows;
};


// Delete package
const deletePackage = async (id) => {

    const existing =
        await packageRepository.getPackageById(id);

    if (!existing) {
        throw new Error("Package not found");
    }

    return await packageRepository.deletePackage(id);
};


module.exports = {
    getPackages,
    getPackageById,
    createPackage,
    updatePackage,
    deletePackage
};