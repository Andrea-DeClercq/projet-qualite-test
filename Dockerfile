# Build du frontend Vue.js
FROM node:18 AS build-frontend
WORKDIR /app/client-vue

COPY client-vue/package.json client-vue/package-lock.json ./
RUN npm install
COPY client-vue ./
RUN npm run build

# Build du backend Node.js
FROM node:18 AS build-backend
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Serveur Nginx pour le frontend
FROM nginx:alpine AS frontend
COPY --from=build-frontend /app/client-vue/dist /usr/share/nginx/html

# Conteneur final pour exécuter l’API + Serveur
FROM node:18
WORKDIR /app

COPY --from=build-backend /app ./
COPY --from=frontend /usr/share/nginx/html /public

# Exposer les ports pour le backend (3000) et Nginx (80)
EXPOSE 3000 80

# Démarrer simultanément le backend et Nginx
CMD ["sh", "-c", "node server.js & nginx -g 'daemon off;'"]
