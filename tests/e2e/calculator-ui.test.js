import { test, expect } from '@playwright/test';

const URL = "http://localhost:5173";

test.describe("Interface Calculatrice - Tests UI et Historique", () => {

    test("Affichage et fonctionnement des boutons", async ({ page }) => {
        await page.goto(URL);

        await expect(page.locator('.operation-preview')).toHaveText('0');

        await page.click('button:text("7")');
        await page.click('button:text("+")');
        await page.click('button:text("3")');
        await page.click('button:text("=")');

        await expect(page.locator('.display')).toHaveValue('10');
    });

    test("Effacement de l’écran", async ({ page }) => {
        await page.goto(URL);

        await page.click('button:text("9")');
        await page.click('button:text("C")');

        await expect(page.locator('.display')).toHaveValue('');
    });

    test("Multiplication avec 0", async ({ page }) => {
        await page.goto(URL);

        await page.click('button:text("5")');
        await page.click('button:text("×")');
        await page.click('button:text("0")');
        await page.click('button:text("=")');

        await expect(page.locator('.display')).toHaveValue('0');
    });

    test("Division par 0 affiche une erreur", async ({ page }) => {
        await page.goto(URL);

        await page.click('button:text("9")');
        await page.click('button:text("÷")');
        await page.click('button:text("0")');
        await page.click('button:text("=")');

        await expect(page.locator('.display')).toHaveValue('Erreur : Division par 0');
    });

    test("Historique des calculs est mis à jour", async ({ page }) => {
        await page.goto(URL);

        await page.click('button:text("8")');
        await page.click('button:text("+")');
        await page.click('button:text("2")');
        await page.click('button:text("=")');

        await expect(page.locator('.display')).toHaveValue('10');

        // Vérifier que l’historique contient bien "8 + 2 = 10"
        await expect(page.locator('.history ul li')).toHaveText(/8 \+ 2 = 10/);
    });

    test("Effacement de l'historique", async ({ page }) => {
        await page.goto(URL);

        await page.click('button:text("5")');
        await page.click('button:text("+")');
        await page.click('button:text("5")');
        await page.click('button:text("=")');

        await expect(page.locator('.display')).toHaveValue('10');

        // Vérifier que l’historique est présent
        await expect(page.locator('.history ul li')).toHaveCount(1);

        // Effacer l’historique
        await page.click('button:text("Vider l\'historique")');

        // Vérifier que l’historique est vide
        await expect(page.locator('.history ul li')).toHaveCount(0);
    });
});
