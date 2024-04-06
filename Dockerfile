FROM node:18

WORKDIR /Blog2

COPY . .

WORKDIR /Blog2/Frontend
RUN npm i 
RUN npm run build

WORKDIR /Blog2/Backend
RUN npm i 

EXPOSE 3001

CMD ["node", "app.js"]