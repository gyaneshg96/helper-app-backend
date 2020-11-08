DROP DATABASE  IF EXISTS  "helper_app";

CREATE DATABASE "helper_app";

DROP USER IF EXISTS admin;

CREATE USER admin WITH PASSWORD 'password';

GRANT ALL PRIVILEGES ON DATABASE "helper_app" to admin;