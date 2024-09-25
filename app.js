// require express
const express = require('express');
const cors = require('cors');

// create a new express app
const app = express();

// import uses router
const usersRouter = require('./controller/users');


// use the cors middleware
app.use(cors());
// use the express.json middleware
app.use(express.json());

//define all endpoints here
app.use('/api/users',usersRouter);


// export the app
module.exports = app;