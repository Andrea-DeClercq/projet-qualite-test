# Build du frontend Vue.js
FROM node:18 AS build-frontend
WORKDIR /app/front-calculator

COPY front-calculator/package.json front-calculator/package-lock.json ./
RUN npm install
COPY front-calculator ./
RUN npm run build

#  Build du backend Node.js
FROM node:18 AS build-backend
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Conteneur final avec Node.js + Nginx
FROM node:18-alpine
WORKDIR /app

# Installer Nginx dans l’image finale
RUN apk add --no-cache nginx

# Copier le frontend généré dans Nginx
COPY --from=build-frontend /app/front-calculator/dist /usr/share/nginx/html

# Copier le backend Node.js dans /app
COPY --from=build-backend /app /app

# Copier la configuration Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exposer les ports pour le backend (3000) et le frontend via Nginx (80)
EXPOSE 3000 80

# Démarrer simultanément le backend et Nginx
CMD ["sh", "-c", "cd /app && node server.js & nginx -g 'daemon off;'"]