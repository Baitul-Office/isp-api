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
// Basic - allow all origins (fine for local dev, not for production)
app.use(cors());

// Production-appropriate - restrict to specific origin(s)
// const corsOptions = {
//   origin: 'http://localhost:3000', // or your frontend's actual domain
//   credentials: true, // needed if you're sending cookies / auth headers
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// };

// app.use(cors(corsOptions));

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