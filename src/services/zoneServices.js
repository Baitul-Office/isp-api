const repository = require("../repositories/zoneRepository");

async function getZones() {
    return await repository.getZones();
}

async function getZoneById(id) {
    if (!id) {
        throw new Error("Zone ID is required");
    }

    const zone = await repository.getZoneById(id);

    if (!zone) {
        throw new Error("Zone not found");
    }

    return zone;
}

async function createZone(data) {

    if (!data.branchid) {
        throw new Error("Branch is required");
    }

    if (!data.name || data.name.trim() === "") {
        throw new Error("Zone name is required");
    }

    const zone = {
        branchid: data.branchid,
        name: data.name.trim(),
        code: data.code ? data.code.trim() : null,
        description: data.description
            ? data.description.trim()
            : null,
        isactive: data.isactive ?? 1,
        addedby: data.addedby ?? null
    };

    return await repository.createZone(zone);
}

async function updateZone(id, data) {

    if (!id) {
        throw new Error("Zone ID is required");
    }

    if (!data.branchid) {
        throw new Error("Branch is required");
    }

    if (!data.name || data.name.trim() === "") {
        throw new Error("Zone name is required");
    }

    const zone = {
        branchid: data.branchid,
        name: data.name.trim(),
        code: data.code ? data.code.trim() : null,
        description: data.description
            ? data.description.trim()
            : null,
        isactive: data.isactive ?? 1,
        updatedby: data.updatedby ?? null
    };

    return await repository.updateZone(id, zone);
}

async function deleteZone(id) {

    if (!id) {
        throw new Error("Zone ID is required");
    }

    return await repository.deleteZone(id);
}

module.exports = {
    getZones,
    getZoneById,
    createZone,
    updateZone,
    deleteZone
};