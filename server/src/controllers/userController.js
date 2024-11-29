const Task = require('../models/taskModel');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

async function getUser(req, res) {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function createNewTask(req, res) {
    const userId = req.params.id;
    console.log(req.body);
    const task = new Task({
        ...req.body,  
        userId: userId 
    });
    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

async function getAllTasks(req, res) {
    try {
        const userId = req.params.id;
        const tasks = await Task.find({ userId: userId}).sort({ dueDate: 1 });
        if (!tasks.length) return res.status(404).json({ message: 'No Tasks found' });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function updateTask(req, res) {
    try {
        const taskId = req.params.taskId;
        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ message: 'Not found' });

        Object.keys(req.body).forEach(key => {
            task[key] = req.body[key];
        });

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

async function removeTask(req, res) {
    try {
        const task = await Task.findByIdAndDelete(req.params.taskId);
        if (!task) return res.status(404).json({ message: 'Not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function changePassword(req, res){
    const { currentPassword, newPassword } = req.body;
    console.log(req.body);
    console.log("bbb");
    console.log(currentPassword);
    console.log("jjj");
    const userId = req.params.id;
    try {
        // Find the user by userId
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ error: true, message: 'User not found' });
        }
    
console.log(user.password);        // Check if currentPassword matches the stored hashed password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
          return res.status(400).json({ error: true, message: 'Current password is incorrect' });
        }
    
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
    
        // Update the user's password
        user.password = hashedPassword;
        await user.save();
    
        return res.status(200).json({ error: false, message: 'Password updated successfully' });
    } catch (error) {
    console.error('Error updating password:', error);
    return res.status(500).json({ error: true, message: 'Internal server error' });
    }
}

module.exports = {
    getAllTasks,
    createNewTask,
    getUser,
    updateTask,
    removeTask,
    changePassword,
};