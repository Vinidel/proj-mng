# proj-mng
Small SPA Project Management tool

## Running docker
 - docker-compose up

## Connect to data base
 psql -d proj-mng -U fakeuser -p 5436 -h localhost

 ## There is a bug in Sequelize
 userId not being set to null on delete in Project