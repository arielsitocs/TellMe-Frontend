FROM node:20-alpine

WORKDIR /app

# Solo copiamos los package para aprovechar el caché de Docker
COPY package*.json ./
RUN npm install

# Copiamos el resto
COPY . .

# En desarrollo usamos el comando dev
CMD ["npm", "run", "dev"]