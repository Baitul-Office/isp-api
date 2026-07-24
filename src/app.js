const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const router = require("./routes/index");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const errorHandler = require(
    "./middlewares/errorMiddleware"
);

const app = express();

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);


app.get("/", (req, res) => {
    res.json({
        message: "ISP API Running"
    });
});

app.use("/api", router);

app.use(errorHandler);

module.exports = app;