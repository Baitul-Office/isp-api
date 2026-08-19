const db = require("../config/db");

// Get all OLTs
const getAll = async () => {
    const [rows] = await db.query(`
        SELECT
            id,
            name,
            oltcode,
            vendor,
            model,
            serialno,
            ipaddress,
            username,
            ponportcount,
            status,
            description,
            addedby,
            addeddate,
            updatedby,
            updateddate
        FROM isp_olt
        ORDER BY id DESC
    `);

    return rows;
};


// Get OLT by ID
const getById = async (id) => {
    const [rows] = await db.query(`
        SELECT
            id,
            name,
            oltcode,
            vendor,
            model,
            serialno,
            ipaddress,
            username,
            ponportcount,
            status,
            description,
            addedby,
            addeddate,
            updatedby,
            updateddate
        FROM isp_olt
        WHERE id = ?
    `, [id]);

    return rows[0];
};


// Create OLT
const create = async (data) => {

    const {
        name,
        oltcode,
        vendor,
        model,
        serialno,
        ipaddress,
        username,
        ponportcount,
        status,
        description,
        addedby
    } = data;

    const [result] = await db.query(`
        INSERT INTO isp_olt (
            name,
            oltcode,
            vendor,
            model,
            serialno,
            ipaddress,
            username,
            ponportcount,
            status,
            description,
            addedby
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
        name,
        oltcode,
        vendor || null,
        model || null,
        serialno || null,
        ipaddress || null,
        username || null,
        ponportcount || 0,
        status || 1,
        description || null,
        addedby || null
    ]);

    return result.insertId;
};


// Update OLT
const update = async (id, data) => {

    const {
        name,
        oltcode,
        vendor,
        model,
        serialno,
        ipaddress,
        username,
        ponportcount,
        status,
        description,
        updatedby
    } = data;

    const [result] = await db.query(`
        UPDATE isp_olt
        SET
            name = ?,
            oltcode = ?,
            vendor = ?,
            model = ?,
            serialno = ?,
            ipaddress = ?,
            username = ?,
            ponportcount = ?,
            status = ?,
            description = ?,
            updatedby = ?
        WHERE id = ?
    `, [
        name,
        oltcode,
        vendor || null,
        model || null,
        serialno || null,
        ipaddress || null,
        username || null,
        ponportcount || 0,
        status || 1,
        description || null,
        updatedby || null,
        id
    ]);

    return result.affectedRows;
};


// Delete OLT
const remove = async (id) => {

    const [result] = await db.query(`
        DELETE FROM isp_olt
        WHERE id = ?
    `, [id]);

    return result.affectedRows;
};


module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};