import { test, expect } from '@playwright/test';

const API_URL = "/api/calculator/calculate";

test.describe("API Calculator - Tests E2E", () => {

    test("Addition 5 + 3 doit retourner 8", async ({ request }) => {
        const response = await request.post(API_URL, {
            data: { num1: 5, num2: 3, operation: "+" },
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.result).toBe(8);
    });

    test("Soustraction 10 - 4 doit retourner 6", async ({ request }) => {
        const response = await request.post(API_URL, {
            data: { num1: 10, num2: 4, operation: "-" },
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.result).toBe(6);
    });

    test("Division par zéro doit retourner une erreur", async ({ request }) => {
        const response = await request.post(API_URL, {
            data: { num1: 10, num2: 0, operation: "/" },
        });
        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body.error).toBe("Division par zéro impossible.");
    });

    test("Opération inconnue doit retourner une erreur", async ({ request }) => {
        const response = await request.post(API_URL, {
            data: { num1: 10, num2: 5, operation: "unknown" },
        });
        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body.error).toBe("Opération non supportée.");
    });

});