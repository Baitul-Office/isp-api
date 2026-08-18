const express = require("express");

const router = express.Router();

const controller = require("../controllers/boxController");

router.get("/", controller.getBoxes);

router.get("/:id", controller.getBoxById);

router.post("/", controller.createBox);

router.put("/:id", controller.updateBox);

router.delete("/:id", controller.deleteBox);

module.exports = router;