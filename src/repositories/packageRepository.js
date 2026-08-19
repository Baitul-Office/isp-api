const db = require("../config/db");

// Get all packages
const getAllPackages = async ({ page = 1, limit = 10, search = "" }) => {
    const offset = (page - 1) * limit;

    const searchValue = `%${search}%`;

    const [rows] = await db.query(
        `
        SELECT
            id,
            name,
            code,
            description,
            downloadspeed,
            uploadspeed,
            monthlyprice,
            installationfee,
            validitydays,
            datalimitgb,
            maxdevices,
            mikrotikprofile,
            packagetype,
            isactive,
            addedby,
            addeddate,
            updatedby,
            updateddate
        FROM isp_package
        WHERE
            name LIKE ?
            OR code LIKE ?
            OR packagetype LIKE ?
        ORDER BY id DESC
        LIMIT ? OFFSET ?
        `,
        [searchValue, searchValue, searchValue, Number(limit), Number(offset)]
    );

    const [countRows] = await db.query(
        `
        SELECT COUNT(*) AS total
        FROM isp_package
        WHERE
            name LIKE ?
            OR code LIKE ?
            OR packagetype LIKE ?
        `,
        [searchValue, searchValue, searchValue]
    );

    return {
        rows,
        total: countRows[0].total
    };
};


// Get package by ID
const getPackageById = async (id) => {
    const [rows] = await db.query(
        `
        SELECT *
        FROM isp_package
        WHERE id = ?
        `,
        [id]
    );

    return rows[0];
};


// Create package
const createPackage = async (data) => {
    const {
        name,
        code,
        description,
        downloadspeed,
        uploadspeed,
        monthlyprice,
        installationfee,
        validitydays,
        datalimitgb,
        maxdevices,
        mikrotikprofile,
        packagetype,
        isactive,
        addedby
    } = data;

    const [result] = await db.query(
        `
        INSERT INTO isp_package
        (
            name,
            code,
            description,
            downloadspeed,
            uploadspeed,
            monthlyprice,
            installationfee,
            validitydays,
            datalimitgb,
            maxdevices,
            mikrotikprofile,
            packagetype,
            isactive,
            addedby
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            name,
            code,
            description || null,
            downloadspeed,
            uploadspeed,
            monthlyprice,
            installationfee,
            validitydays ?? 30,
            datalimitgb ?? null,
            maxdevices ?? null,
            mikrotikprofile || null,
            packagetype || "HOME",
            isactive ?? 1,
            addedby ?? null
        ]
    );

    return result.insertId;
};


// Update package
const updatePackage = async (id, data) => {
    const {
        name,
        code,
        description,
        downloadspeed,
        uploadspeed,
        monthlyprice,
        installationfee,
        validitydays,
        datalimitgb,
        maxdevices,
        mikrotikprofile,
        packagetype,
        isactive,
        updatedby
    } = data;

    const [result] = await db.query(
        `
        UPDATE isp_package
        SET
            name = ?,
            code = ?,
            description = ?,
            downloadspeed = ?,
            uploadspeed = ?,
            monthlyprice = ?,
            installationfee = ?,
            validitydays = ?,
            datalimitgb = ?,
            maxdevices = ?,
            mikrotikprofile = ?,
            packagetype = ?,
            isactive = ?,
            updatedby = ?
        WHERE id = ?
        `,
        [
            name,
            code,
            description || null,
            downloadspeed,
            uploadspeed,
            monthlyprice,
            installationfee,
            validitydays,
            datalimitgb ?? null,
            maxdevices ?? null,
            mikrotikprofile || null,
            packagetype,
            isactive,
            updatedby ?? null,
            id
        ]
    );

    return result.affectedRows;
};


// Delete package
const deletePackage = async (id) => {
    const [result] = await db.query(
        `
        DELETE FROM isp_package
        WHERE id = ?
        `,
        [id]
    );

    return result.affectedRows;
};


// Check duplicate code
const getPackageByCode = async (code, excludeId = null) => {

    let sql = `
        SELECT id
        FROM isp_package
        WHERE code = ?
    `;

    const params = [code];

    if (excludeId) {
        sql += ` AND id <> ?`;
        params.push(excludeId);
    }

    const [rows] = await db.query(sql, params);

    return rows[0];
};


module.exports = {
    getAllPackages,
    getPackageById,
    createPackage,
    updatePackage,
    deletePackage,
    getPackageByCode
};