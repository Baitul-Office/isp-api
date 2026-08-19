const express = require("express");

const router = express.Router();

const ponController = require("../controllers/ponController");


// Get all PONs
// GET /api/pon?page=1&limit=10&search=GPON
router.get("/", ponController.getAll);


// Get PON by ID
// GET /api/pon/1
router.get("/:id", ponController.getById);


// Create PON
// POST /api/pon
router.post("/", ponController.create);


// Update PON
// PUT /api/pon/1
router.put("/:id", ponController.update);


// Delete PON
// DELETE /api/pon/1
router.delete("/:id", ponController.remove);


module.exports = router;