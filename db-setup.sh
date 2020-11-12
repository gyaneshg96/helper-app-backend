
#!/bin/bash
echo "Creating a postgres container" 
docker run -d -p 5432:5432 --name postgres_server -e POSTGRES_PASSWORD=mysecretpassword postgres

docker cp postgres/init_db.sql my-postgres:docker-entrypoint-initdb.d/init_db.sql

echo "Creating admin and database"
docker exec -it my-postgres psql -U postgres -f docker-entrypoint-initdb.d/init_db.sql