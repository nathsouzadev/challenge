cd ./web

touch .env
echo "SERVICE_UPLOAD=http://localhost:3001" >> .env

npm install

cd ../server

touch .env
echo DB_USER="postgres" >> .env
echo DB_PASSWORD="p4ssw0rd-t3st3-db" >> .env
echo DB_HOST="localhost" >> .env
echo DB_PORT="5432" >> .env
echo DB_NAME="postgres" >> .env

docker-compose up -d
npm install
npm run db

