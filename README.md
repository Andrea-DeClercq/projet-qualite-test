
# 🧮 Calculatrice - Qualité & Tests

Ce projet est une **application de calculatrice** développée avec **Node.js** (Express pour le backend) et **Vue.js** (pour l'interface utilisateur).  
L'application est un TP sur la **qualité logicielle**, avec une utilisation de différentes technologies pour les **tests unitaires (Jest), tests E2E (Playwright) et tests de performance (Artillery)**.

---

## 📌 **🛠️ Technologies utilisées**
- **Frontend** : Vue.js + Vite
- **Backend** : Node.js + Express
- **Base de données** : Aucune (calculs en mémoire)
- **Tests** :
  - **Tests unitaires** → Jest
  - **Tests E2E** → Playwright
  - **Tests de performance** → Artillery
- **CI/CD** : GitHub Actions
- **Docker** : Conteneurisation du projet avec backend et frontend intégrés sous Nginx.

---

## 📌 **🚀 Installation & Démarrage**

### **1️⃣ Cloner le repository**
```sh
git clone https://github.com/votre-repo/calculatrice.git
cd calculatrice
```

### **2️⃣ Installation des dépendances**
*Dépendances backend*
```sh
npm install
```
*Dépendances frontend*
```sh
cd front-calculator
npm install
```

### **3️⃣ Lancer l’application en mode développement**

Lancer le backend :
```sh
npm start
```

Lancer le frontend Vue.js :
```sh
cd front-calculator
npm run dev
```

### **4️⃣ Accéder à l’application**
    Frontend Vue.js : http://localhost:5173
    API Backend : http://localhost:3000/api-docs , l'endpoint swagger de l'API.

## **📌 🔍 Fonctionnalités**

- ✔ Calculs mathématiques : Addition, Soustraction, Multiplication, Division, Modulo, Exponentiation.
- ✔ Historique des calculs : Affichage des derniers résultats.
- ✔ Gestion d’erreur : Division par 0 gérée proprement.
- ✔ Tests automatisés : Vérification de la fiabilité du système.
- ✔ Dockerisation : Déploiement rapide sur tout environnement.

## **📌 🧪 Tests**
### 1️⃣ *Exécuter les tests unitaires (Jest)*

```sh
npm run test:unit
```

### 2️⃣ *Exécuter les tests E2E (Playwright)*

```sh
npm run test:e2e
```

### 3️⃣ *Exécuter les tests de performance (Artillery)*

```sh
npm run test:performance
```

## **📌 🐳 Dockerisation**
### 1️⃣ Build l’image Docker

```sh
docker build -t calculatrice-app .
```

### 2️⃣ Lancer le conteneur

```sh
docker run -p 3000:3000 -p 8080:80 calculatrice-app
```

    Accéder au frontend : http://localhost:8080
    Accéder à l’API : http://localhost:3000/api-docs , l'endpoint swagger de l'API.

## **📌 ⚙️ CI/CD avec GitHub Actions**

Les tests sont automatisés avec GitHub Actions et s’exécutent à chaque push sur main ou develop :

-   Tests unitaires avec Jest
-   Tests E2E avec Playwright
-   Tests de performance avec Artillery
