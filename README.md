# README for the challenge of Appeiron #

To run the project you will need to following the next instructions.

### Commands ###

* **`npm i`** → To install all the dependencies that we use in the project.
* **`npm run dev`** → To run the project.
* **`npm run test`** → To run the unit test.
* **`npm run doc`** → To run the documentation.

### Important! ##

We use an Authorization method to run all the services. This method is with a Bearer Token that you can obtain executing the service of login user.
The credentials for admin user are:
    email: admin@example.com
    password: Asdf1234

Here is a sample of .env file:
```
#API SETTINGS
NODE_ENV=dev
PORT=3000

#LOGGER
LOGGER_LEVEL=dev

#MONGODB DATABASE
MONGO_USERNAME=
MONGO_PASSWORD=
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_DATABASE=appeiron_challenge
MONGO_SSL=false
MONGO_CONNECTION_TYPE=mongodb

#AUTHORIZATION
KEY_PRELOGIN=APPEIRONCHALLENGE
```
And here is a sample of .env.test file:
```
#API SETTINGS
NODE_ENV=test
PORT=3001

#LOGGER
LOGGER_LEVEL=dev

#MONGODB DATABASE
MONGO_USERNAME=
MONGO_PASSWORD=
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_DATABASE=appeiron_challenge_test
MONGO_SSL=false
MONGO_CONNECTION_TYPE=mongodb

#AUTHORIZATION
KEY_PRELOGIN=APPEIRONCHALLENGE
```
**Appeiron Challenge**