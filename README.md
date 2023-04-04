# Project Name

# Directory structure

```
app
    └ src                             → Application sources
        └ application                 → Application services layer
            └ repositories            → Data access objects interfaces (Request data from services and query to Database)
            └ usecases                → Application business logic
        └ constant                    → Constant value or static value
        └ domain                      → Enterprise core business layer or Entities
            └ models                  → Domain model objects such as Entities, Aggregates, Value Objects, Business Events, Serializers, etc.
        └ infrastructure              → Frameworks, drivers and tools such as Database, the Web Framework, mailing/logging/glue code etc.
            └ component               → third party component such as (axios, cron, redis, etc)
                L aws                 → aws component such as (s3, etc)
                └ cache               → cache data objects
                └ client              → http request client such as (axios, etc)
                └ scheduler           → scheduler such as (cron, etc)
                L queue               → queue such as (RabbitMQ, Kafka, etc)
                    └ producer        → producer to queue such as (RabbitMQ, Kafka, etc)
                    └ consumer        → consumer from queue such as (RabbitMQ, Kafka, etc)
            └ database                → connection to database
            └ http                    → Express.js Web server configuration (routes, plugins, etc.)
                └ routes              → Express.js routes definition
        └ interface                   → Adapters and formatters for use cases and entities to external agency such as Database or the Web
            └ controllers             → Express.js route handlers
            └ middlewares             → Express.js route middlewares (protection)
            └ requests                → Express.js validation request from client
            └ views                   → Express.js views application (HTML)
        └ utils                       → application helper etc
    └ node_modules (generated)        → NPM dependencies
```

# How to run

1. npm install
2. copy .env.example to .env
3. fill .env file
4. npx sequelize db:migrate
5. npx sequelize db:seed:all
6. npm run dev

# Account Default

1. username: admin
2. password: admin123

# Postman
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/8051022-161c23d3-b20b-4409-97f9-288cfa17bc4e?action=collection%2Ffork&collection-url=entityId%3D8051022-161c23d3-b20b-4409-97f9-288cfa17bc4e%26entityType%3Dcollection%26workspaceId%3D943557ba-d536-46d9-8cec-16ee0092fd1b)
