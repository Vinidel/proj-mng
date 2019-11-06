# proj-mng
Small SPA Project Management tool

## Dependencies
 - NodeJs
 - Docker

## Run api in dev mode
 - `npm run start:server:db`

## Running docker only
 - `docker-compose up -d`

## Running Server only
 - `npm run start:dev`

## Connect to data base
 `psql -d proj-mng -U fakeuser -p 5436 -h localhost`
- If you want to connect directly to the database you will need Posgress installed 



 ## Routes
 ### POST /api/login
 ``` Javascript
  {
	"email": "vini@admin.com",
	"password": "fakepassword"
}
 ```
 - Response
 ``` Javascript
 {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpbmlAYWRtaW4uY29tIiwicm9sZSI6IkFETUlOIiwiaWQiOjEsImlhdCI6MTU3Mjk0NzcwMCwiZXhwIjoxNTcyOTgzNzAwfQ.s1BDvDXnuLGdqe4iRH-5M4M0aypzQQq6Vv-yrVI37yg"
}
 ```
 ### GET /api/projects
 - Needs authorization in headers
 - Response
 ``` Javascript
 [
    {
        "id": 2,
        "name": "A not so great project",
        "description": "Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.",
        "createdAt": "2019-11-04T23:48:46.594Z",
        "updatedAt": "2019-11-04T23:48:46.594Z",
        "UserId": null
    },
]
 ```
 ### GET /api/users
 - Needs authorization in headers
  - Response
 ``` Javascript
[
    {
        "id": 1,
        "name": "Vinny Admin",
        "email": "vini@admin.com",
        "password": "$2a$08$YWp.ELsA51VBeJdRO/zQPuXS8XHBdtE2WVkiS/aQs/3Xi/OTz9UcC",
        "role": "ADMIN",
        "createdAt": "2019-11-04T23:48:46.583Z",
        "updatedAt": "2019-11-04T23:48:46.583Z"
    }
]
 ```
 ### POST /api/projects
 - Needs authorization in headers
 - Response
 ``` Javascript
 [
    {
        "id": 2,
        "name": "A not so great project",
        "description": "Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.",
        "createdAt": "2019-11-04T23:48:46.594Z",
        "updatedAt": "2019-11-04T23:48:46.594Z",
        "UserId": null
    },
]
 ```
 ### POST /api/users
 - Needs authorization in headers
  - Response
 ``` Javascript
{
    "id": 5,
    "name": "Vini",
    "email": "v@fffsfv.com",
    "password": "$2a$08$bZAWmk3NG5NbtFTfjwiyy.GJoj0QgnRcjpBSgl6piHxRkz2R2vs2G",
    "role": "PROJECT_MANAGER",
    "updatedAt": "2019-11-05T10:04:41.199Z",
    "createdAt": "2019-11-05T10:04:41.199Z"
}
 ```
 ### PATCH /api/projects/:id
 - Needs authorization in headers
 - Response
 ``` Javascript
 {
    "id": 2,
    "name": "A great project maybe not",
    "description": "I m tired",
    "createdAt": "2019-11-04T23:48:46.594Z",
    "updatedAt": "2019-11-05T09:56:52.348Z",
    "UserId": 3
}
 ```
 ### PATCH /api/users/:id
 - Needs authorization in headers
 - Response
 ``` Javascript
 {}
 ```
 ### DELETE /api/projects/:id
 - Needs authorization in headers
  - Response
 ``` Javascript
 {}
 ```
 ### DELETE /api/users/:id
 - Needs authorization in headers
  - Response
 ``` Javascript
 {}
 ```

 ## Things that need work
 - Store JWT for session expiry
 - Store Keys for encryption and token generation
 - Better Structure in Object Composition
 - User response has password on it
 - Because of a bug UserId is Uppercase in json response
 - Needs more logs
 - Store roles in database and provide them via api
