const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authToken , requireUser } = require('../middleware/authProvider')

// get all tasks og a particula user 
router.get('/getTasks/:id',  authToken, requireUser, userController.getAllTasks); 

// create a task
router.post('/createTask/:id',  authToken, requireUser, userController.createNewTask);

// get user profile 
router.get('/profile/:id', authToken, requireUser, userController.getUser);

// update a task 
router.patch('/editTask/:taskId', authToken, requireUser, userController.updateTask);

// delete a task
router.delete('/deleteTask/:taskId', authToken, requireUser,userController.removeTask);

//change password
router.post('/change-password/:id',  authToken, requireUser, userController.changePassword);


module.exports = router;