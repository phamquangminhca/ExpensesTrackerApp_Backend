const express = require('express');
const { registerUserCtrl, loginUserCtrl, getUserProfileCtrl, deleteUserCtrl, updateUserCtrl } = require('../../controllers/users/usersCtrl');
const isLoggedIn = require('../../middlewares/isLoggedIn');

const usersRoute = express.Router();

//POST/api/v1/users/register
usersRoute.post('/register', registerUserCtrl);

//POST/api/v1/users/login
usersRoute.post('/login', loginUserCtrl);

//GET/api/v1/users/profile
usersRoute.get('/profile', isLoggedIn, getUserProfileCtrl);

//DELETE/api/v1/users/:id
usersRoute.delete('/:id', deleteUserCtrl);

//PUT/api/v1/users/:id
usersRoute.put('/:id', updateUserCtrl);

module.exports = usersRoute;