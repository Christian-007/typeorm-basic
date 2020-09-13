# TypeORM with TypeScript
This repository is intended for playing around with TypeORM APIs in TypeScript and generated using TypeORM init command, but modified with a basic Backend layered architecture (Controller, Service, Entity).

## Pre-requisites
- Ensure that you've setup a local database (e.g. `mysql`, `postgres`, etc.) before running this project.

## Steps to run this project:
1. Clone this repository.
2. Run `npm i` command.
3. Setup database settings inside `ormconfig.json` file. An example would be:
```json
{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "test",
  "password": "test",
  "database": "db_name",
  "synchronize": true,
  "logging": false,
  "entities": ["src/entity/**/*.ts"],
  "migrations": ["src/migration/**/*.ts"],
  "subscribers": ["src/subscriber/**/*.ts"],
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
}
```
4. Create a database locally within your machine depending on your `ormconfig.json`. For example, with the above example, the db would be `mysql` with the database of `db_name`.
5. Run `npm start` command.
