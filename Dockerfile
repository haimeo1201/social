FROM node:current-alpine AS build

WORKDIR /usr/src/app
ADD ./socii-fe .
RUN npm i
RUN npm run build

FROM node:current-alpine

WORKDIR /usr/src/app
COPY --from=build /usr/src/app/build ./build
COPY . .
RUN rm -rf ./socii-fe
COPY ./prisma ./prisma
RUN npm i --only=production
EXPOSE 8080
CMD ["npm", "run", "start:migrate:prod"]
