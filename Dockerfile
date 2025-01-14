FROM node:18-bullseye AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
RUN npm prune --production

FROM node:18-bullseye

WORKDIR /app

RUN apt-get update && apt-get install -y \
  default-mysql-client \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

RUN npm install --only=development

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
