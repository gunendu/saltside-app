# saltside-app

sd-app

This app is build useing nodejs express framework, mongodb is used for storage with port 27017

app is divided into two micro services sd-app and sd-core

sd-app contains all the endpoints defination with, request validation and response formating, it receives the request json, do some processinng and pass the paramas to sd-controller, sd-controller is the core component where all the db connections,db read, write is done.

Configuring sd-app

1) git clone https://github.com/gunendu/saltside-app
2) cd project folder(saltside-app)
3) npm install (install dependencies)

4) git clone https://github.com/gunendu/saltside-core
5) cd project folder(saltside-core)
6) npm install
7) npm link

8) cd saltside-app
9) npm link saltside-core  

10) cd bin
11) ./www (should start the app on port 9005)

automated Test:

using nodejs mocha for testing

cd test
mocha server.js
