const express = require("express");

const router = express.Router();

const controller = require("../controllers/popController");


// Get all POPs
router.get("/", controller.getAll);


// Get POP by ID
router.get("/:id", controller.getById);


// Get POPs by Branch ID
router.get("/branch/:id", controller.getByBranchId);


// Create POP
router.post("/", controller.create);


// Update POP
router.put("/:id", controller.update);


// Delete POP
router.delete("/:id", controller.remove);


module.exports = router;