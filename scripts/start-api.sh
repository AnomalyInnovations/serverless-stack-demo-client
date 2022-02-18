# /bin/bash

set -e


echo "Starting the api"
(
	cd serverless-stack-demo-api
  docker-compose up -d
  npm install
  node --experimental-modules scripts/init-table.js
  npm start
)
