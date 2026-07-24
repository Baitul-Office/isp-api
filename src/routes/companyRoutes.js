const express = require("express");

const controller = require(
    "../controllers/companyController"
);

const router = express.Router();
/**
 * @swagger
 * /api/company:
 *   get:
 *     summary: Get all companies
 *     tags: [Company]
 *     responses:
 *       200:
 *         description: A list of companies
 */
router.get("/", controller.getCompanies);

/**
 * @swagger
 * /api/company/{id}:
 *   get:
 *     summary: Get a company by ID
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Company found
 *       404:
 *         description: Company not found
 */

router.get("/:id", controller.getCompany);

/**
 * @swagger
 * /api/company/create:
 *   post:
 *     summary: Create a new company
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - binno
 *               - email
 *               - phone
 *               - addedby
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Acme Telecom Ltd"
 *               binno:
 *                 type: string
 *                 example: "123456789"
 *               tagline:
 *                 type: string
 *                 example: "Connecting you better"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "info@acmetelecom.com"
 *               phone:
 *                 type: string
 *                 example: "01700000000"
 *               address:
 *                 type: string
 *                 example: "123 Main Street, Dhaka"
 *               isactive:
 *                 type: integer
 *                 example: 1
 *               addedby:
 *                 type: integer
 *                 description: User ID of the creator
 *                 example: 1
 *     responses:
 *       201:
 *         description: Company created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Company Created Successfully"
 *                 id:
 *                   type: integer
 *                   example: 15
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/create", controller.createCompany);

/**
 * @swagger
 * /api/company/edit/{id}:
 *   put:
 *     summary: Update a company
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Company updated
 *       404:
 *         description: Company not found
 */
router.put("/edit/:id", controller.updateCompany);
/**
 * @swagger
 * /api/company/delete/{id}:
 *   delete:
 *     summary: Delete a company
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Company deleted
 *       404:
 *         description: Company not found
 */
router.delete("/delete/:id", controller.deleteCompany);

module.exports = router;