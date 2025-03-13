const express = require("express");
const router = express.Router();

router.post("/calculate", (req, res) => {
    const { num1, num2, operation } = req.body;

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: "Les entrées doivent être des nombres." });
    }

    let result;
    switch (operation) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            if (num2 === 0) return res.status(400).json({ error: "Division par zéro impossible." });
            result = num1 / num2;
            break;
        case "%":
            result = num1 % num2;
            break;
        case "**":
            result = num1 ** num2;
            break;
        default:
            return res.status(400).json({ error: "Opération non supportée." });
    }

    res.json({ result });
});

module.exports = router;