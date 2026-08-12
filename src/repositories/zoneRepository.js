const db = require("../config/db");

async function getZones() {
    const sql = `
        SELECT
            z.id,
            z.branchid,
            b.name AS branchname,
            z.name,
            z.code,
            z.description,
            z.isactive,
            z.addedby,
            z.addeddate,
            z.updatedby,
            z.updateddate
        FROM isp_zone z
        INNER JOIN isp_branch b
            ON b.id = z.branchid
        ORDER BY z.id DESC
    `;

    const [rows] = await db.query(sql);
    return rows;
}

async function getZoneById(id) {
    const sql = `
        SELECT
            z.id,
            z.branchid,
            b.name AS branchname,
            z.name,
            z.code,
            z.description,
            z.isactive,
            z.addedby,
            z.addeddate,
            z.updatedby,
            z.updateddate
        FROM isp_zone z
        INNER JOIN isp_branch b
            ON b.id = z.branchid
        WHERE z.id = ?
    `;

    const [rows] = await db.query(sql, [id]);
    return rows[0];
}

async function createZone(zone) {
    const sql = `
        INSERT INTO isp_zone
        (
            branchid,
            name,
            code,
            description,
            isactive,
            addedby
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
        zone.branchid,
        zone.name,
        zone.code,
        zone.description,
        zone.isactive ?? 1,
        zone.addedby
    ]);

    return {
        id: result.insertId,
        ...zone
    };
}

async function updateZone(id, zone) {
    const sql = `
        UPDATE isp_zone
        SET
            branchid = ?,
            name = ?,
            code = ?,
            description = ?,
            isactive = ?,
            updatedby = ?
        WHERE id = ?
    `;

    const [result] = await db.query(sql, [
        zone.branchid,
        zone.name,
        zone.code,
        zone.description,
        zone.isactive,
        zone.updatedby,
        id
    ]);

    return result;
}

async function deleteZone(id) {
    const sql = `
        DELETE FROM isp_zone
        WHERE id = ?
    `;

    const [result] = await db.query(sql, [id]);

    return result;
}

module.exports = {
    getZones,
    getZoneById,
    createZone,
    updateZone,
    deleteZone
};