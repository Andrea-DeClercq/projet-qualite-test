const request = require("supertest");
const express = require("express");
const calculatorRoutes = require("../../routes/calculator");

const app = express();
app.use(express.json());
app.use("/api/calculator", calculatorRoutes);

describe("Tests API Calculator", () => {
    test("Addition de 5 + 3 doit retourner 8", async () => {
        const response = await request(app)
            .post("/api/calculator/calculate")
            .send({ num1: 5, num2: 3, operation: "+" });

        expect(response.status).toBe(200);
        expect(response.body.result).toBe(8);
    });

    test("Soustraction de 10 - 4 doit retourner 6", async () => {
        const response = await request(app)
            .post("/api/calculator/calculate")
            .send({ num1: 10, num2: 4, operation: "-" });

        expect(response.status).toBe(200);
        expect(response.body.result).toBe(6);
    });

    test("Multiplication de 7 * 6 doit retourner 42", async () => {
        const response = await request(app)
            .post("/api/calculator/calculate")
            .send({ num1: 7, num2: 6, operation: "*" });

        expect(response.status).toBe(200);
        expect(response.body.result).toBe(42);
    });

    test("Division de 20 / 5 doit retourner 4", async () => {
        const response = await request(app)
            .post("/api/calculator/calculate")
            .send({ num1: 20, num2: 5, operation: "/" });

        expect(response.status).toBe(200);
        expect(response.body.result).toBe(4);
    });

    test("Division par zéro doit retourner une erreur", async () => {
        const response = await request(app)
            .post("/api/calculator/calculate")
            .send({ num1: 10, num2: 0, operation: "/" });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Division par zéro impossible.");
    });

    test("Modulo 10 % 3 doit retourner 1", async () => {
        const response = await request(app)
            .post("/api/calculator/calculate")
            .send({ num1: 10, num2: 3, operation: "%" });

        expect(response.status).toBe(200);
        expect(response.body.result).toBe(1);
    });

    test("Exponentiation 2 ** 3 doit retourner 8", async () => {
        const response = await request(app)
            .post("/api/calculator/calculate")
            .send({ num1: 2, num2: 3, operation: "**" });

        expect(response.status).toBe(200);
        expect(response.body.result).toBe(8);
    });

    test("Entrée non numérique doit retourner une erreur", async () => {
        const response = await request(app)
            .post("/api/calculator/calculate")
            .send({ num1: "abc", num2: 5, operation: "+" });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Les entrées doivent être des nombres.");
    });

    test("Opération inconnue doit retourner une erreur", async () => {
        const response = await request(app)
            .post("/api/calculator/calculate")
            .send({ num1: 10, num2: 5, operation: "invalid" });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Opération non supportée.");
    });
});