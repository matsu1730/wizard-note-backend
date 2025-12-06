FROM node:23-alpine as base

FROM base AS dependencies

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM base AS build

WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build

FROM base AS deploy

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package.json package-lock.json ./

CMD ["npm", "run", "start:prod"]