const express = require("express");

const router = express.Router();

const controller = require("../controllers/subzoneController");

router.get("/", controller.getSubzones);

router.get("/:id", controller.getSubzoneById);

router.get("/subzonebyzone/:zoneid", controller.getSubzoneByZoneId);

router.post("/", controller.createSubzone);

router.put("/:id", controller.updateSubzone);

router.delete("/:id", controller.deleteSubzone);

module.exports = router;