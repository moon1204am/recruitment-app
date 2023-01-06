# Recruitment Application

This application is our contribution to the course IV1201 at KTH. It contains a backend API built using Node.js, 
Express and Sequelize with a postgresql database. The frontend is built using React. 

To host the application on Heroku, the frontend and backend has been split into two repositories at: 
* Frontend: https://gits-15.sys.kth.se/mhansbo/recruitment-test-react
* Backend: https://gits-15.sys.kth.se/mhansbo/recruitment-test

The heroku application can be found at:
* Frontend: https://recruitment-tester-react.herokuapp.com/
* Backend: https://recruitment-tester.herokuapp.com/


## Description

The application is meant as a platform where people can apply to work at an amusement park. It will allow applicants to 
send in general applications and recruiters to view these and send a job offer. The application is not complete but 
includes a view where the recruiter can see the current applications. 

## Getting Started

### Dependencies

* Node.js
* Express
* Sequelize
* React
* JWT
* Axios
* dotenv-safe
* CryptoJS


### Installing


The full application can be downloaded from https://gits-15.sys.kth.se/mayajo/recruitment-application.

Be sure to install Node.js, and then clone the repository.


Create an .env file in both the client and server folder by copying the corresponding .env.example and fill in the values.
For the program to function the SECRETKEY in the server .env needs to be the same as the REACT_SECRET_KEY in the client .env.
Make sure the proxy in the client package.json is the port that you are hosting the server on.


### Executing program

* Create the database, the application will create the tables.
* Open the Client and Server folders in two separate terminals and run the following commands for each:

#### Windows
Client:
```
npm start
```
Server:
```
npm run start-dev
```
#### MacOS
Client:
```
npm start
```
Server:
```
npm run dev-start
```


## Authors

Marta Hansbo, [mhansbo@kth.se](mhansbo@kth.se)  
Maya, [mayajo@kth.se](mayajo@kth.se)  
Jinglan Qin, [jinglan@kth.se](jinglan@kth.se)


## Acknowledgments

* [ReadMe template](https://gist.github.com/DomPizzie/7a5ff55ffa9081f2de27c315f5018afc)
* [Course](https://www.kth.se/student/kurser/kurs/IV1201)
* [Leif Lindbäck Example](https://github.com/KTH-IV1201/chat)