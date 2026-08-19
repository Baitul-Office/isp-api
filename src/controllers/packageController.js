const packageService = require("../services/packageServices");


// GET /api/package
const getPackages = async (req, res) => {

    try {

        const {
            page = 1,
            limit = 10,
            search = ""
        } = req.query;

        const result =
            await packageService.getPackages(
                page,
                limit,
                search
            );

        res.json({
            success: true,
            data: result.rows,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total: result.total,
                totalPages: Math.ceil(
                    result.total / Number(limit)
                )
            }
        });

    } catch (error) {

        console.error("Get packages error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to load packages"
        });
    }
};


// GET /api/package/:id
const getPackageById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Package ID is required"
            });
        }

        const data =
            await packageService.getPackageById(id);

        res.json({
            success: true,
            data
        });

    } catch (error) {

        console.error("Get package error:", error);

        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};


// POST /api/package
const createPackage = async (req, res) => {

    try {

        const packageData = req.body;

        const id =
            await packageService.createPackage(
                packageData
            );

        res.status(201).json({
            success: true,
            message: "Package created successfully",
            id
        });

    } catch (error) {

        console.error("Create package error:", error);

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// PUT /api/package/:id
const updatePackage = async (req, res) => {

    try {

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Package ID is required"
            });
        }

        await packageService.updatePackage(
            id,
            req.body
        );

        res.json({
            success: true,
            message: "Package updated successfully"
        });

    } catch (error) {

        console.error("Update package error:", error);

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// DELETE /api/package/:id
const deletePackage = async (req, res) => {

    try {

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Package ID is required"
            });
        }

        await packageService.deletePackage(id);

        res.json({
            success: true,
            message: "Package deleted successfully"
        });

    } catch (error) {

        console.error("Delete package error:", error);

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    getPackages,
    getPackageById,
    createPackage,
    updatePackage,
    deletePackage
};