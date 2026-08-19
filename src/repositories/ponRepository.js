const db = require("../config/db");

// Get all PONs
const getAll = async ({ page = 1, limit = 10, search = "" }) => {
    const offset = (page - 1) * limit;

    const searchValue = `%${search}%`;

    const [rows] = await db.query(
        `
        SELECT
            id,
            ponno,
            poncode,
            pontype,
            capacity,
            status,
            description,
            addedby,
            addeddate,
            updatedby,
            updateddate
        FROM isp_pon
        WHERE
            poncode LIKE ?
            OR pontype LIKE ?
            OR description LIKE ?
        ORDER BY id DESC
        LIMIT ? OFFSET ?
        `,
        [
            searchValue,
            searchValue,
            searchValue,
            Number(limit),
            Number(offset)
        ]
    );

    const [countRows] = await db.query(
        `
        SELECT COUNT(*) AS total
        FROM isp_pon
        WHERE
            poncode LIKE ?
            OR pontype LIKE ?
            OR description LIKE ?
        `,
        [
            searchValue,
            searchValue,
            searchValue
        ]
    );

    return {
        rows,
        total: countRows[0].total
    };
};


// Get PON by ID
const getById = async (id) => {

    const [rows] = await db.query(
        `
        SELECT
            id,
            ponno,
            poncode,
            pontype,
            capacity,
            status,
            description,
            addedby,
            addeddate,
            updatedby,
            updateddate
        FROM isp_pon
        WHERE id = ?
        `,
        [id]
    );

    return rows[0];
};


// Check duplicate PON
const checkDuplicate = async (ponno, poncode, excludeId = null) => {

    let sql = `
        SELECT id
        FROM isp_pon
        WHERE
            (ponno = ? OR poncode = ?)
    `;

    const params = [ponno, poncode];

    if (excludeId !== null) {
        sql += ` AND id <> ?`;
        params.push(excludeId);
    }

    sql += ` LIMIT 1`;

    const [rows] = await db.query(sql, params);

    return rows[0];
};


// Create PON
const create = async (data) => {

    const {
        ponno,
        poncode,
        pontype,
        capacity,
        status,
        description,
        addedby
    } = data;

    const [result] = await db.query(
        `
        INSERT INTO isp_pon
        (
            ponno,
            poncode,
            pontype,
            capacity,
            status,
            description,
            addedby
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [
            ponno,
            poncode,
            pontype,
            capacity,
            status,
            description,
            addedby
        ]
    );

    return result.insertId;
};


// Update PON
const update = async (id, data) => {

    const {
        ponno,
        poncode,
        pontype,
        capacity,
        status,
        description,
        updatedby
    } = data;

    const [result] = await db.query(
        `
        UPDATE isp_pon
        SET
            ponno = ?,
            poncode = ?,
            pontype = ?,
            capacity = ?,
            status = ?,
            description = ?,
            updatedby = ?
        WHERE id = ?
        `,
        [
            ponno,
            poncode,
            pontype,
            capacity,
            status,
            description,
            updatedby,
            id
        ]
    );

    return result.affectedRows;
};


// Delete PON
const remove = async (id) => {

    const [result] = await db.query(
        `
        DELETE FROM isp_pon
        WHERE id = ?
        `,
        [id]
    );

    return result.affectedRows;
};


module.exports = {
    getAll,
    getById,
    checkDuplicate,
    create,
    update,
    remove
};