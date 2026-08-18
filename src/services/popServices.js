const repository = require("../repositories/popRepository");


async function getAll() {

    return await repository.getAll();

}


async function getById(id) {

    if (!id) {
        throw new Error("POP ID is required");
    }

    const data = await repository.getById(id);

    if (!data) {
        const error = new Error("POP not found");
        error.statusCode = 404;
        throw error;
    }

    return data;
}


async function create(data) {

    if (!data.branchid) {
        throw new Error("Branch ID is required");
    }

    if (!data.name || data.name.trim() === "") {
        throw new Error("POP name is required");
    }

    const id = await repository.create(data);

    return await repository.getById(id);
}


async function update(id, data) {

    if (!id) {
        throw new Error("POP ID is required");
    }

    if (!data.branchid) {
        throw new Error("Branch ID is required");
    }

    if (!data.name || data.name.trim() === "") {
        throw new Error("POP name is required");
    }

    const existing = await repository.getById(id);

    if (!existing) {
        const error = new Error("POP not found");
        error.statusCode = 404;
        throw error;
    }

    await repository.update(id, data);

    return await repository.getById(id);
}


async function remove(id) {

    if (!id) {
        throw new Error("POP ID is required");
    }

    const existing = await repository.getById(id);

    if (!existing) {
        const error = new Error("POP not found");
        error.statusCode = 404;
        throw error;
    }

    await repository.remove(id);

    return {
        message: "POP deleted successfully"
    };
}


async function getByBranchId(branchid) {

    if (!branchid) {
        throw new Error("Branch ID is required");
    }

    return await repository.getByBranchId(branchid);
}


module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    getByBranchId
};