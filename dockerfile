FROM node:20

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm i

RUN npm run build

COPY run.sh /usr/local/bin/run.sh

EXPOSE 3000

RUN chmod +x /usr/local/bin/run.sh

CMD ["/usr/local/bin/run.sh"]
