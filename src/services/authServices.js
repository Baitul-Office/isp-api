const repo = require("../repositories/authRepository");

async function getAllUsers() {
    return await repo.getAllUsers();
}

async function getUserById(id) {
    const user = await repo.getUserById(id);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
}

async function getUserByemail(email) {
    const user = await repo.getUserByemail(email);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
}


module.exports = {
    getAllUsers,
    getUserById,
    getUserByemail
};