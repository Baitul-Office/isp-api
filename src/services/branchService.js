const repo = require("../repositories/branchRepository");

async function getBranches() {
    return await repo.getAllBranches();
}

async function getBranch(id) {
    const user = await repo.getBranchById(id);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
}

async function createBranch(data) {

    if (!data.name) {
        throw new Error("Name is required");
    }

    if (!data.isactive) {
        throw new Error("Active status is required");
    }

    return await repo.createBranch(data);
}

module.exports = {
    getBranches,
    getBranch,
    createBranch
};