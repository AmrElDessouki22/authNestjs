## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Endpoints
```
  import postman collection (./xramile.postman_collection.json) and try each endpoint you will find example request/response
```

## Run docker app 
```bash
$  docker compose up
```

## run local 
```bash
# to run adminer make sure to download php
$ npm run adminer

# to create db you can edit this script to add your user and db name 
$ chmod +x ./create-db.sh

# make sure you db runing on port 5432

# add your db info in config/config.json app change "host": "postgres", to "host": "localhost"

# change "host": "postgres", to "host": "localhost", in /src/app/app.module.ts

# add your db info in .env.local DATABASE_NAME='xramile' , DATABASE_USERNAME='xramile' , DATABASE_PASSWORD='xramile' , DATABASE_DIALECT='postgres'
# Usually, I should not push the .env.local, but I will push it to make testing easier.

# upgrade migrations
$ npm run db:update:migration

# run app 
$ npm run start:dev
```

## DB local 
```bash
# after the adminer is up
$ npm run adminer

# visit http://localhost:8080/adminer.php and login to manage you db

# some times you will need to login in the host with your ip:db port if prostgres / localhost didn't work 
```

## DB Docker 
```
# visit 
http://localhost:8086 and login to manage you db

# some times you will need to login in the host with your ip:db port if prostgres / localhost didn't work 

```


