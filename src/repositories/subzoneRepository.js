const db = require("../config/db");

async function getAll() {
    const [rows] = await db.query(`
        SELECT
    s.id,
    s.zoneid,
    z.name AS zonename,
    z.branchid,
    b.name AS branchname,
    s.name,
    s.address,
    s.remarks,
    s.isactive,
    s.addedby,
    s.addeddate,
    s.updatedby,
    s.updateddate
FROM isp_subzone s
LEFT JOIN isp_zone z
    ON z.id = s.zoneid
LEFT JOIN isp_branch b
    ON b.id = z.branchid
ORDER BY s.id DESC;
    `);

    return rows;
}

async function getById(id) {
    const [rows] = await db.query(`
        SELECT
    s.id,
    s.zoneid,
    z.name AS zonename,
    z.branchid,
    b.name AS branchname,
    s.name,
    s.address,
    s.remarks,
    s.isactive,
    s.addedby,
    s.addeddate,
    s.updatedby,
    s.updateddate
FROM isp_subzone s
LEFT JOIN isp_zone z
    ON z.id = s.zoneid
LEFT JOIN isp_branch b
    ON b.id = z.branchid
        WHERE s.id = ?
    `, [id]);

    return rows[0];
}


async function getSubzoneByZoneId(id) {
    const [rows] = await db.query(`
        SELECT
    s.id,
    s.zoneid,
    z.name AS zonename,
    z.branchid,
    b.name AS branchname,
    s.name,
    s.address,
    s.remarks,
    s.isactive,
    s.addedby,
    s.addeddate,
    s.updatedby,
    s.updateddate
FROM isp_subzone s
LEFT JOIN isp_zone z
    ON z.id = s.zoneid
LEFT JOIN isp_branch b
    ON b.id = z.branchid
        WHERE s.zoneid = ?
    `, [id]);

    return rows;
}


async function create(data) {

    const {
        zoneid,
        name,
        address,
        remarks,
        isactive,
        addedby
    } = data;

    const [result] = await db.query(`
        INSERT INTO isp_subzone
        (
            zoneid,
            name,
            address,
            remarks,
            isactive,
            addedby,
            addeddate
        )
        VALUES (?, ?, ?, ?, ?, ?, NOW())
    `, [
        zoneid,
        name,
        address || null,
        remarks || null,
        isactive ?? 1,
        addedby || null
    ]);

    return result.insertId;
}

async function update(id, data) {

    const {
        zoneid,
        name,
        address,
        remarks,
        isactive,
        updatedby
    } = data;

    const [result] = await db.query(`
        UPDATE isp_subzone
        SET
            zoneid = ?,
            name = ?,
            address = ?,
            remarks = ?,
            isactive = ?,
            updatedby = ?,
            updateddate = NOW()
        WHERE id = ?
    `, [
        zoneid,
        name,
        address || null,
        remarks || null,
        isactive ?? 1,
        updatedby || null,
        id
    ]);

    return result.affectedRows;
}

async function remove(id) {

    const [result] = await db.query(`
        DELETE FROM isp_subzone
        WHERE id = ?
    `, [id]);

    return result.affectedRows;
}

module.exports = {
    getAll,
    getById,
    getSubzoneByZoneId,
    create,
    update,
    remove
};