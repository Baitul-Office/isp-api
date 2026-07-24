const db = require("../config/db");

async function GetAllCompanies() {
    const [rows] = await db.query(
        "select * from isp_company"
    );

    return rows;
}

async function getCompanyById(id) {
    const [rows] = await db.query(
        "select * from isp_company where id = ?",
        [id]
    );
}

async function createCompany(company) {
    const {name,binno,tagline,email,phone,address,isactive, addedby} = company;
    const sql = `
        insert into isp_company(name,binno,tagline,email,phone,address,isactive,addedby)
        values(?,?,?,?,?,?,?,?)
        `;
    const [result] = await db.query(
        sql,
        [name,binno,tagline,email,phone,address, isactive, addedby]
    );
    return result.insertId;
}

async function updateCompany(id, company) {
    const sql = `
        UPDATE isp_company
        SET
            name = ?,
            binno = ?,
            tagline = ?,
            email = ?,
            phone = ?,
            address = ?,
            updatedby = ?,
            updateddate = CURRENT_TIMESTAMP
        WHERE id = ?
    `;

    const [result] = await db.query(sql, [
        company.name,
        company.binno,
        company.tagline,
        company.email,
        company.phone,
        company.address,
        company.updatedby,
        id
    ]);

    return result;
}



async function deleteCompany(id, userid) {
    const sql = `
        UPDATE isp_company
        SET
            isdeleted = 1,
            deletedby = ?,
            deleteddate = CURRENT_TIMESTAMP
        WHERE id = ?
    `;

    const [result] = await db.query(sql, [
        userid,
        id
    ]);

    return result;
}


module.exports = {
    GetAllCompanies,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany
}