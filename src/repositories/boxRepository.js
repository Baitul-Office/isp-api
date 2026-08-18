// const db = require("../config/db");

// async function getBoxes() {
//     const [rows] = await db.query(`
//         SELECT
//             b.id,
//             b.subzoneid,
//             sz.name AS subzonename,
//             z.id AS zoneid,
//             z.name AS zonename,
//             br.id AS branchid,
//             br.name AS branchname,
//             b.name,
//             b.boxdetails,
//             b.regdate,
//             b.isactive,
//             b.addedby,
//             b.addeddate,
//             b.updatedby,
//             b.updateddate
//         FROM isp_box b
//         INNER JOIN isp_subzone sz
//             ON b.subzoneid = sz.id
//         INNER JOIN isp_zone z
//             ON sz.zoneid = z.id
//         INNER JOIN isp_branch br
//             ON z.branchid = br.id
//         ORDER BY b.id DESC
//     `);

//     return rows;
// }

// async function getBoxById(id) {
//     const [rows] = await db.query(`
//         SELECT
//             b.id,
//             b.subzoneid,
//             sz.name AS subzonename,
//             z.id AS zoneid,
//             z.name AS zonename,
//             br.id AS branchid,
//             br.name AS branchname,
//             b.name,
//             b.boxdetails,
//             b.regdate,
//             b.isactive,
//             b.addedby,
//             b.addeddate,
//             b.updatedby,
//             b.updateddate
//         FROM isp_box b
//         INNER JOIN isp_subzone sz
//             ON b.subzoneid = sz.id
//         INNER JOIN isp_zone z
//             ON sz.zoneid = z.id
//         INNER JOIN isp_branch br
//             ON z.branchid = br.id
//         WHERE b.id = ?
//     `, [id]);

//     return rows[0];
// }

// async function createBox(data) {

//     const {
//         subzoneid,
//         name,
//         boxdetails,
//         isactive,
//         addedby
//     } = data;

//     const [result] = await db.query(`
//         INSERT INTO isp_box
//         (
//             subzoneid,
//             name,
//             boxdetails,
//             isactive,
//             addedby
//         )
//         VALUES (?, ?, ?, ?, ?)
//     `, [
//         subzoneid,
//         name,
//         boxdetails || null,
//         isactive ?? 1,
//         addedby
//     ]);

//     return result;
// }

// async function updateBox(id, data) {

//     const {
//         subzoneid,
//         name,
//         boxdetails,
//         isactive,
//         updatedby
//     } = data;

//     const [result] = await db.query(`
//         UPDATE isp_box
//         SET
//             subzoneid = ?,
//             name = ?,
//             boxdetails = ?,
//             isactive = ?,
//             updatedby = ?
//         WHERE id = ?
//     `, [
//         subzoneid,
//         name,
//         boxdetails || null,
//         isactive,
//         updatedby,
//         id
//     ]);

//     return result;
// }

// async function deleteBox(id, updatedby) {

//     const [result] = await db.query(`
//         UPDATE isp_box
//         SET
//             isactive = 0,
//             updatedby = ?
//         WHERE id = ?
//     `, [updatedby, id]);

//     return result;
// }

// module.exports = {
//     getBoxes,
//     getBoxById,
//     createBox,
//     updateBox,
//     deleteBox
// };

const db = require("../config/db");

async function getBoxes({ page, limit, search }) {

    const offset = (page - 1) * limit;

    let whereClause = "";
    let params = [];

    if (search && search.trim() !== "") {
        whereClause = `
            WHERE
                b.name LIKE ?
                OR b.boxdetails LIKE ?
                OR sz.name LIKE ?
                OR z.name LIKE ?
                OR br.name LIKE ?
        `;

        const searchValue = `%${search.trim()}%`;

        params.push(
            searchValue,
            searchValue,
            searchValue,
            searchValue,
            searchValue
        );
    }

    const countSql = `
        SELECT COUNT(*) AS total
        FROM isp_box b
        INNER JOIN isp_subzone sz
            ON b.subzoneid = sz.id
        INNER JOIN isp_zone z
            ON sz.zoneid = z.id
        INNER JOIN isp_branch br
            ON z.branchid = br.id
        ${whereClause}
    `;

    const [countRows] = await db.query(countSql, params);

    const total = countRows[0].total;

    const dataSql = `
        SELECT
            b.id,
            b.subzoneid,
            sz.name AS subzonename,
            z.id AS zoneid,
            z.name AS zonename,
            br.id AS branchid,
            br.name AS branchname,
            b.name,
            b.boxdetails,
            b.regdate,
            b.isactive,
            b.addedby,
            b.addeddate,
            b.updatedby,
            b.updateddate
        FROM isp_box b
        INNER JOIN isp_subzone sz
            ON b.subzoneid = sz.id
        INNER JOIN isp_zone z
            ON sz.zoneid = z.id
        INNER JOIN isp_branch br
            ON z.branchid = br.id
        ${whereClause}
        ORDER BY b.id DESC
        LIMIT ? OFFSET ?
    `;

    const dataParams = [
        ...params,
        limit,
        offset
    ];

    const [rows] = await db.query(dataSql, dataParams);

    return {
        rows,
        total
    };
}

async function getBoxById(id) {

    const [rows] = await db.query(`
        SELECT
            b.id,
            b.subzoneid,
            sz.name AS subzonename,
            z.id AS zoneid,
            z.name AS zonename,
            br.id AS branchid,
            br.name AS branchname,
            b.name,
            b.boxdetails,
            b.regdate,
            b.isactive,
            b.addedby,
            b.addeddate,
            b.updatedby,
            b.updateddate
        FROM isp_box b
        INNER JOIN isp_subzone sz
            ON b.subzoneid = sz.id
        INNER JOIN isp_zone z
            ON sz.zoneid = z.id
        INNER JOIN isp_branch br
            ON z.branchid = br.id
        WHERE b.id = ?
    `, [id]);

    return rows[0];
}

async function createBox(data) {

    const {
    subzoneid,
    name,
    boxdetails,
    regdate,
    isactive,
    addedby
} = data;

const [result] = await db.query(`
    INSERT INTO isp_box
    (
        subzoneid,
        name,
        boxdetails,
        regdate,
        isactive,
        addedby
    )
    VALUES (?, ?, ?, ?, ?, ?)
`, [
    subzoneid,
    name,
    boxdetails || null,
    regdate,
    isactive ?? 1,
    addedby
]);

return result;
}

async function updateBox(id, data) {
const {
    subzoneid,
    name,
    boxdetails,
    regdate,
    isactive,
    updatedby
} = data;

const [result] = await db.query(`
    UPDATE isp_box
    SET
        subzoneid = ?,
        name = ?,
        boxdetails = ?,
        regdate = ?,
        isactive = ?,
        updatedby = ?
    WHERE id = ?
`, [
    subzoneid,
    name,
    boxdetails || null,
    regdate,
    isactive,
    updatedby,
    id
]);

return result;
}

async function deleteBox(id, updatedby) {

    const [result] = await db.query(`
        UPDATE isp_box
        SET
            isactive = 0,
            updatedby = ?
        WHERE id = ?
    `, [updatedby, id]);

    return result;
}

module.exports = {
    getBoxes,
    getBoxById,
    createBox,
    updateBox,
    deleteBox
};