FROM node:22.14.0

WORKDIR /app

COPY . /app/

RUN npm install

RUN apt-get update && apt-get install -y netcat-traditional

EXPOSE 3001

CMD ["npm", "start"]