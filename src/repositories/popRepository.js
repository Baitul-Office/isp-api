const db = require("../config/db");

async function getAll() {
    const [rows] = await db.query(`
        SELECT
            p.id,
            p.branchid,
            b.name AS branchname,
            p.popcode,
            p.name,
            p.address,
            p.locationurl,
            p.status,
            CASE
                WHEN p.status = 1 THEN 'ACTIVE'
                WHEN p.status = 2 THEN 'INACTIVE'
                WHEN p.status = 3 THEN 'MAINTENANCE'
                WHEN p.status = 4 THEN 'CLOSED'
                ELSE 'UNKNOWN'
            END AS statusname,
    p.capacity,
    p.capacityunit,
            p.remarks,
            p.addedby,
            p.addeddate,
            p.updatedby,
            p.updated_at
        FROM isp_pop p
        LEFT JOIN isp_branch b
            ON b.id = p.branchid
        ORDER BY p.id DESC
    `);

    return rows;
}


async function getById(id) {
    const [rows] = await db.query(`
        SELECT
            p.id,
            p.branchid,
            b.name AS branchname,
            p.popcode,
            p.name,
            p.address,
            p.locationurl,
            p.status,
            CASE
                WHEN p.status = 1 THEN 'ACTIVE'
                WHEN p.status = 2 THEN 'INACTIVE'
                WHEN p.status = 3 THEN 'MAINTENANCE'
                WHEN p.status = 4 THEN 'CLOSED'
                ELSE 'UNKNOWN'
            END AS statusname,
    p.capacity,
    p.capacityunit,
            p.remarks,
            p.addedby,
            p.addeddate,
            p.updatedby,
            p.updated_at
        FROM isp_pop p
        LEFT JOIN isp_branch b
            ON b.id = p.branchid
        WHERE p.id = ?
    `, [id]);

    return rows[0];
}


async function create(data) {

    const {
        branchid,
        popcode,
        name,
        address,
        locationurl,
        status,
        capacity,
        capacityunit,
        remarks,
        addedby
    } = data;

    const [result] = await db.query(`
        INSERT INTO isp_pop
        (
            branchid,
            popcode,
            name,
            address,
            locationurl,
            status,
            capacity,
            capacityunit,
            remarks,
            addedby
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
        branchid,
        popcode,
        name,
        address,
        locationurl,
        status || 1,
        capacity,
        capacityunit,
        remarks,
        addedby
    ]);

    return result.insertId;
}


async function update(id, data) {

    const {
        branchid,
        popcode,
        name,
        address,
        locationurl,
        status,
            capacity,
            capacityunit,
        remarks,
        updatedby
    } = data;

    const [result] = await db.query(`
        UPDATE isp_pop
        SET
            branchid = ?,
            popcode = ?,
            name = ?,
            address = ?,
            locationurl = ?,
            status = ?,
            capacity = ?,
            capacityunit = ?,
            remarks = ?,
            updatedby = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `, [
        branchid,
        popcode,
        name,
        address,
        locationurl,
        status,
        capacity,
        capacityunit,
        remarks,
        updatedby,
        id
    ]);

    return result.affectedRows;
}


async function remove(id) {

    const [result] = await db.query(`
        DELETE FROM isp_pop
        WHERE id = ?
    `, [id]);

    return result.affectedRows;
}


async function getByBranchId(branchid) {

    const [rows] = await db.query(`
        SELECT
            p.id,
            p.branchid,
            b.name AS branchname,
            p.popcode,
            p.name,
            p.address,
            p.locationurl,
            p.status,
            CASE
                WHEN p.status = 1 THEN 'ACTIVE'
                WHEN p.status = 2 THEN 'INACTIVE'
                WHEN p.status = 3 THEN 'MAINTENANCE'
                WHEN p.status = 4 THEN 'CLOSED'
                ELSE 'UNKNOWN'
            END AS statusname,
            p.capacity,
            p.capacityunit,
            p.remarks,
            p.addedby,
            p.addeddate,
            p.updatedby,
            p.updated_at
        FROM isp_pop p
        LEFT JOIN isp_branch b
            ON b.id = p.branchid
        WHERE p.branchid = ?
        ORDER BY p.id DESC
    `, [branchid]);

    return rows;
}


module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    getByBranchId
};