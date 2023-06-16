FROM node:18-alpine

WORKDIR /usr/share/app
COPY . .

RUN npm install && \
    npm run build

EXPOSE 3000

ENTRYPOINT ["npm", "run"]

CMD ["start"]