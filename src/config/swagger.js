// src/config/swagger.js
const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation for my Express app",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: [path.join(__dirname, "../routes/*.js").replace(/\\/g, "/")],
};

const swaggerSpec = swaggerJSDoc(options);

console.log("Swagger paths found:", Object.keys(swaggerSpec.paths));

module.exports = swaggerSpec;