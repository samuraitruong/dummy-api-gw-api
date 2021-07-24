FROM node:16-alpine

WORKDIR /app
ENV PORT=80
EXPOSE 80
COPY . .

RUN npm install

ENTRYPOINT ["npm", "start"]
