const service = require("../services/zoneServices");

async function getZones(req, res) {
    try {

        const data = await service.getZones();

        res.json({
            success: true,
            data: data
        });

    } catch (err) {

        console.error("getZones error:", err);

        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}


async function getZoneById(req, res) {
    try {

        const { id } = req.params;

        const data = await service.getZoneById(id);

        res.json({
            success: true,
            data: data
        });

    } catch (err) {

        console.error("getZoneById error:", err);

        const status =
            err.message === "Zone not found"
                ? 404
                : 500;

        res.status(status).json({
            success: false,
            message: err.message
        });
    }
}


async function getZoneByBranchId(req, res) {
    try {

        const { branchid } = req.params;

        console.log("Branch ID received:", branchid);

        const data = await service.getZoneByBranchId(branchid);

        res.json({
            success: true,
            data: data
        });

    } catch (err) {

        console.error("getZoneByBranchId error:", err);

        const status =
            err.message === "Zone not found"
                ? 404
                : 500;

        res.status(status).json({
            success: false,
            message: err.message
        });
    }
}


async function createZone(req, res) {
    try {

        console.log("Create Zone Body:", req.body);

        const data = await service.createZone(req.body);

        res.status(201).json({
            success: true,
            message: "Zone created successfully",
            data: data
        });

    } catch (err) {

        console.error("createZone error:", err);

        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}


async function updateZone(req, res) {
    try {

        const { id } = req.params;

        const result = await service.updateZone(
            id,
            req.body
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Zone not found"
            });
        }

        res.json({
            success: true,
            message: "Zone updated successfully"
        });

    } catch (err) {

        console.error("updateZone error:", err);

        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}


async function deleteZone(req, res) {
    try {

        const { id } = req.params;

        const result = await service.deleteZone(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Zone not found"
            });
        }

        res.json({
            success: true,
            message: "Zone deleted successfully"
        });

    } catch (err) {

        console.error("deleteZone error:", err);

        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}


module.exports = {
    getZones,
    getZoneById,
    getZoneByBranchId,
    createZone,
    updateZone,
    deleteZone
};