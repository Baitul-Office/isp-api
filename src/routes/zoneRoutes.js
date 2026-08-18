const express = require("express");

const controller = require("../controllers/zoneController");

const router = express.Router();


router.get("/", controller.getZones);

router.get("/:id", controller.getZoneById);

router.get("/zonebybranch/:branchid", controller.getZoneByBranchId);

router.post("/", controller.createZone);

router.put("/:id", controller.updateZone);

router.delete("/:id", controller.deleteZone);


module.exports = router;