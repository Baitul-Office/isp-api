
const repo = require("../repositories/companyRepository");


const getCompanies = async() => {
    return await repo.GetAllCompanies();
}

const getCompany = async(id) => {
    const company = await repo.getCompanyById(id);

    if (!company) {
        throw new Error("Company not found");
    }

    return company;
}

const createCompany = async(data) => {

    if (!data.name) {
        throw new Error("Name is required");
    }

    if (!data.isactive) {
        throw new Error("Active status is required");
    }

    return await repo.createCompany(data);
}

const updateCompany = async (id, data) => {

   const exist = await repo.getCompanyById(id);

    if (!exist) {
        throw new Error("Company not found");
    }

    return await repo.updateCompany(id,data);
}


const deleteCompany = async(id, userid) => {
    
   const exist = await repo.getCompanyById(id);

    if (!exist) {
        throw new Error("Company not found");
    }

    return await repo.deleteCompany(id,userid);
}


module.exports = {
    getCompanies,
    getCompany,
    createCompany,
    updateCompany,
    deleteCompany,
};