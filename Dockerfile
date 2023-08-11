FROM node:16-alpine

WORKDIR /badbank_backend

COPY . .

RUN npm install

EXPOSE 8000

CMD ["node", "index.js"]