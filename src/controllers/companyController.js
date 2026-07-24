const service = require("../services/companyService");

const getCompanies = async(req, res, next) => {
    try{
        const data = await service.getCompanies();

        res.json(data);
    } catch(err){
        next(err);
    }
}

const getCompany = async (req,res,next) => {
    try{
        const data = await service.getCompany(
            req.params.id
        );

        res.json(data);
    } catch(err){
        next(err);
    }
}

const createCompany = async(req,res,next) =>{
    try{
        const id = await service.createCompany(
            req.body
        );

        res.status(201).json({
            message:"Company Created Successfully",
            id
        });
    } catch(err){
        next(err);
    }
}



const updateCompany = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const updatedCompany = await service.updateCompany(id, data);

        res.status(200).json({
            success: true,
            message: "Company updated successfully",
            data: updatedCompany
        });
    } catch (err) {
        next(err);
    }
};

const deleteCompany = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userid } = req.body; // or req.user.id if using authentication

        const result = await service.deleteCompany(id, userid);

        res.status(200).json({
            success: true,
            message: "Company deleted successfully",
            data: result
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getCompanies,
    getCompany,
    createCompany,
    updateCompany,
    deleteCompany
};