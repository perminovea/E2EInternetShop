FROM node:20.17 
WORKDIR /app 
COPY package.json package-lock.json ./ 
RUN npm ci
RUN npm playwright install
COPY . .
