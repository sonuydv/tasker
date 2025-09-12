# Tasker 
#### Simple Task Management Web Application

##  To Run the application

###  Prerequisites
`Docker must be installed on your system and properly configured for the current user`.


####  Clone the repository
```sh
   git clone https://github.com/sonuydv/tasker.git
```

####  Navigate to the project directory
```sh
   cd tasker
```
####  Start the application using Docker Compose
```sh
   docker-compose up
```
Wait for the services to start

####  Access the application
Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to access the Tasker application.
To access the backend API, navigate to [http://localhost:3000/api](http://localhost:3000/api).

####  Done


### Technical Stack
- Frontend: Angular ( v20)
- Backend: Node.js with Express
- Realtime-communication: Socket.IO
- Database: MongoDB
- Containerization: Docker and Docker Compose

### Features
- Authentication (Sign Up, Login, Logout)
- Create, Read, Update, and Delete (CRUD) tasks
- protected routes for authenticated users
- Mark tasks as completed
- realtime syncing between all the active session of the same user
