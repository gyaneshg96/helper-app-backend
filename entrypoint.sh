docker run -d -p 5432:5432 --name postgres_server -e POSTGRES_PASSWORD=mysecretpassword postgres
docker exec -it my-postgres hostname -I
docker cp postgres/init_db.sql my-postgres:docker-entrypoint-initdb.d/init_db.sql
docker exec -it my-postgres psql -U postgres -f docker-entrypoint-initdb.d/init_db.sql

sequelize db:migrate
sequelize db:seed:all

yarn dev