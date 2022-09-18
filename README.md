
## Installation

```bash
# npm 8 or higher
# node 16 or higher

$ npm install
$ cd client
$ npm install
```

## Database

```bash
$ docker-compose --version (must be 2.7.0)
$ docker-compose up db -d

$ To Insepect DB
$
$ docker-compose exec db bash
$ psql -U postgres -d projectz

```
[psql commands](https://www.postgresqltutorial.com/postgresql-administration/psql-commands/)
[docker cleanup](https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes/)


## Running the backend App

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

$ goto localhost:8000/

```

## Running the Client App

```bash
$ cd client

# development
$ npm run dev

# production mode
$ npm run build

$ goto localhost:8000/
```
