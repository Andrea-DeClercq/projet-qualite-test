const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /api/calculator/calculate:
 *   post:
 *     summary: Effectue un calcul mathématique
 *     description: Permet d'exécuter une opération entre deux nombres.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               num1:
 *                 type: number
 *               num2:
 *                 type: number
 *               operation:
 *                 type: string
 *                 enum: ["+", "-", "*", "/", "%", "**"]
 *     responses:
 *       200:
 *         description: Succès
 *       400:
 *         description: Erreur dans les paramètres fournis
 */
router.post("/calculate", (req, res) => {
    const { num1, num2, operation } = req.body;

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: "Les entrées doivent être des nombres." });
    }

    let result;
    switch (operation) {
        case "+": // Addition
            result = num1 + num2;
            break;
        case "-": // Soustraction
            result = num1 - num2;
            break;
        case "*": // Multiplication
            result = num1 * num2;
            break;
        case "/": // Division
            if (num2 === 0) return res.status(400).json({ error: "Division par zéro impossible." });
            result = num1 / num2;
            break;
        case "%": // Modulo
            result = num1 % num2;
            break;
        case "**": // Exponentiel
            result = num1 ** num2;
            break;
        default:
            return res.status(400).json({ error: "Opération non supportée." });
    }

    res.json({ result });
});

module.exports = router;