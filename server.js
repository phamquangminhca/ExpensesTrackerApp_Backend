const express = require('express');
const usersRoute = require('./routes/users/usersRoute');
const transactionsRoute = require('./routes/transactions/transactionsRoute');
const accountsRoute = require('./routes/accounts/accountsRoute');

const app = express();

//middlewares


//routes

//users routes
app.use('/api/v1/users', usersRoute);

//account routes
app.use('/api/v1/accounts', accountsRoute);

//transactions routes
app.use('/api/v1/transactions', transactionsRoute);


//Error handlers


//listen to server
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));