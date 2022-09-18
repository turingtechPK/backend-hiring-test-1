docker-compose stop;
docker-compose down;
docker volume rm turing_pgdata;
docker-compose up db -d;