const db = require("../config/db");

async function getAllUsers() {
    const [rows] = await db.query(
        "SELECT * FROM isp_user"
    );

    return rows;
}

async function getUserById(id) {
    const [rows] = await db.query(
        "SELECT * FROM isp_user WHERE id=?",
        [id]
    );

    return rows[0];
}

async function getUserByemail(email) {
    const [rows] = await db.query(
        "SELECT * FROM isp_user WHERE email=?",
        [email]
    );

    return rows[0];
}


module.exports = {
    getAllUsers,
    getUserById,
    getUserByemail
};