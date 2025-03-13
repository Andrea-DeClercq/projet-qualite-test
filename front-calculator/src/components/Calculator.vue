<script setup>
import { ref } from "vue";

const display = ref(""); // Affichage principal
const currentExpression = ref(""); // Opération en cours
const num1 = ref(null);
const num2 = ref(null);
const operation = ref(null);
const result = ref(null);
const justCalculated = ref(false);
const history = ref([]); // Historique des opérations

// Ajout des nombres et gestion de la continuité après un calcul
const appendNumber = (number) => {
  if (justCalculated.value) {
    display.value = "";
    currentExpression.value = result.value ? result.value.toString() : "";
    justCalculated.value = false;
  }
  display.value += number;
  currentExpression.value += number;
};

// Définition de l’opération (+, -, *, /)
const setOperation = (op) => {
  if (operation.value) return;

  if (justCalculated.value) {
    num1.value = result.value;
    currentExpression.value = `${result.value} ${op} `;
  } else if (display.value !== "") {
    num1.value = parseFloat(display.value);
    currentExpression.value += ` ${op} `;
  } else {
    return;
  }

  operation.value = op;
  display.value = "";
  justCalculated.value = false;
};

// Exécute le calcul avec l'API backend
const calculate = async () => {
  if (num1.value === null || display.value === "") return;
  num2.value = parseFloat(display.value);

  try {
    const response = await fetch("http://localhost:3000/api/calculator/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ num1: num1.value, num2: num2.value, operation: operation.value }),
    });

    const data = await response.json();

    if (data.error) {
      display.value = data.error; // Afficher l'erreur
      history.value.unshift(`${currentExpression.value} = ${data.error}`); // Ajouter à l'historique
    } else {
      result.value = data.result;
      display.value = result.value;
      currentExpression.value += ` = ${result.value}`;
      history.value.unshift(`${currentExpression.value}`); // Ajouter à l'historique
    }

    justCalculated.value = true;
  } catch (error) {
    console.error("Erreur:", error);
    display.value = "Erreur serveur";
  }

  num1.value = null;
  num2.value = null;
  operation.value = null;
};

const clearDisplay = () => {
  display.value = "";
  currentExpression.value = "";
  result.value = null;
  justCalculated.value = false;
};

const clearHistory = () => {
  history.value = [];
};
</script>

<template>
  <div class="container">
    <div class="calculator">
      <h2>Calculator App</h2>
      <div class="operation-preview">{{ currentExpression || "0" }}</div>
      <input type="text" class="display" v-model="display" readonly />
      
      <div class="buttons">
        <button @click="appendNumber(7)">7</button>
        <button @click="appendNumber(8)">8</button>
        <button @click="appendNumber(9)">9</button>
        <button @click="setOperation('/')">÷</button>

        <button @click="appendNumber(4)">4</button>
        <button @click="appendNumber(5)">5</button>
        <button @click="appendNumber(6)">6</button>
        <button @click="setOperation('*')">×</button>

        <button @click="appendNumber(1)">1</button>
        <button @click="appendNumber(2)">2</button>
        <button @click="appendNumber(3)">3</button>
        <button @click="setOperation('-')">−</button>

        <button @click="appendNumber(0)">0</button>
        <button @click="appendNumber('.')">.</button>
        <button @click="setOperation('+')">+</button>
        <button @click="calculate()" class="equals">=</button>

        <button @click="clearDisplay()" class="clear">C</button>
      </div>
    </div>

    <div class="history">
      <h3>Historique</h3>
      <ul>
        <li v-for="(item, index) in history" :key="index">{{ item }}</li>
      </ul>
      <button @click="clearHistory()" class="clear-history">Vider l'historique</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: flex-start;
}

.calculator {
  width: 280px;
  background: #f8f9fa;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

h2, h3 {
  margin-bottom: 10px;
  font-family: Arial, sans-serif;
}

.operation-preview {
  font-size: 18px;
  color: #666;
  text-align: right;
  padding-right: 5px;
  min-height: 20px;
  margin-bottom: 5px;
}

.display {
  width: 100%;
  height: 50px;
  font-size: 24px;
  text-align: right;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 15px;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

button {
  width: 60px;
  height: 50px;
  font-size: 20px;
  border: none;
  border-radius: 5px;
  background: white;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
}

.equals { background: #f9a825; color: white; }
.clear { background: #d32f2f; color: white; }

.history {
  width: 200px;
  background: #fff;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.history ul {
  list-style-type: none;
  padding: 0;
}

.clear-history {
  background: #d32f2f;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
  width: 100%;
}
</style>