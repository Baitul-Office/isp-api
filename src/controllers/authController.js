const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const service = require("../services/authService");

const login = async (req, res, next) => {
    try {
        const { email, password, remember } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        //const user = await service.getUserByEmail(email);
const user = {
  id: 1,
  name: "Baitul",
  email: "baitul@test.com",
  password: "$2b$10$Xy8kLp9vQmN3rT7wZaB1ue.J4hK6sD2fG8mR5nP0qW3xY1zA9bC7e", // bcrypt hash
  role: "admin",
  companyid: 1,
  isactive: true,
  addedby: null,
  createdat: "2026-01-15T09:30:00.000Z",
  updatedat: "2026-07-20T14:12:00.000Z"
};
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        if (!user.isactive) {
            return res.status(403).json({
                message: "Your account is inactive. Please contact an administrator."
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: remember ? "7d" : "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { login };