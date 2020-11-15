#!/bin/bash

cd /usr/src/helper_app

echo "initializing tables and data"
node_modules/.bin/sequelize db:migrate
node_modules/.bin/sequelize db:seed:all

echo "starting server"
yarn dev