const express = require("express");
const cors = require("cors");
require("dotenv").config();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Configuration du Swagger de l'API
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
        title: "API Calculatrice",
        version: "1.0.0",
        description: "API pour effectuer des opérations mathématiques.",
        },
    },
    apis: ["./routes/*.js"], // Génère la doc depuis les fichiers routes
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
const calculatorRoutes = require("./routes/calculator");
app.use("/api/calculator", calculatorRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
