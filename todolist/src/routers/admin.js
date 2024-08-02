const express = require('express');
const bcrypt = require('bcrypt');
const {AdminSchema}=require('../model/admin.js');
const { addAdmin,createTask, getTasks, deleteTask, updateTask } = require('../controllers/admin.js');
const router=express.Router();
router.post('/login', async (req, res) => {
    const { user, pass } = req.body;
    const foundUser = await AdminSchema.findOne({ username: user });
    if (!foundUser) {
      return res.send("Username not found");
    }
    console.log("Found user:", foundUser);
    const isPassMatch = await bcrypt.compare(pass, foundUser.password);
    if (isPassMatch) {
      console.log("Login Successful");
      return res.send("Login Successful");
    } else {
      return res.send("Wrong password");
    }
});
router.post('/signup', async (req, res) => {
    try {
      const { user, pass } = req.body;
      console.log(user + ' ' + pass);
      const salts = 10;
      const hashedPass = await bcrypt.hash(pass, salts);
      const result = await addAdmin(user,hashedPass);
      res.send('User added successfully!');
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
          res.status(400).send('Username is already taken');
      } else {
          console.error('Error creating admin user:', error);
          res.status(500).send('Internal server error');
      }
  }
});
router.post('/createtask', async (req, res) => {
    try {
        const { user, task, completed } = req.body;
        await createTask(user, task, completed);
        res.send("Task added successfully");
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.delete('/deletetask', async (req, res) => {
    try {
        const { user, task } = req.body;
        await deleteTask(user, task);
        res.send("Task deleted successfully");
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.put('/updatetask', async (req, res) => {
    try {
        const { user, task, updatedTaskData } = req.body;
        await updateTask(user, task, updatedTaskData);
        res.send("Task updated successfully");
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).send("Internal Server Error");
    }
});
router.get('/gettask', async (req, res) => {
    try {
        const { user } = req.query; 
        const tasks = await getTasks(user); 
        res.json(tasks);
    } catch (error) {
        console.error("Error getting tasks:", error);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;

