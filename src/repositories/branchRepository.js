const db = require("../config/db");

async function getAllBranches() {
    const [rows] = await db.query(
        "SELECT * FROM isp_branch"
    );

    return rows;
}

async function getBranchById(id) {
    const [rows] = await db.query(
        "SELECT * FROM isp_branch WHERE id=?",
        [id]
    );

    return rows[0];
}

async function createBranch(user) {
    const { companyid, name, address, isactive, addedby } = user;

    const [result] = await db.query(
        `
        INSERT INTO isp_branch(companyid, name,address,isactive,addedby)
        VALUES (?,?,?,?,?)
        `,
        [companyid, name, address, isactive, addedby]
    );

    return result.insertId;
}

module.exports = {
    getAllBranches,
    getBranchById,
    createBranch
};