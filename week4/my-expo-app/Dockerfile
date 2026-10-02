FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --no-audit --no-fund --progress=false

COPY . .

EXPOSE 8081

CMD ["npx", "expo", "start", "--port", "8081"]
