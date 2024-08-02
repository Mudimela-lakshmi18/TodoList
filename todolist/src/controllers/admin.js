const { AdminSchema , createTaskModelForUser} = require('../model/admin.js');
async function addAdmin(user, pass) {
    try {
        const newAdmin = new AdminSchema({
            username: user,
            password: pass,
        });
        await newAdmin.save();
        createTaskModelForUser(user);

        console.log(`Admin ${user} added successfully.`);
    } catch (error) {
        console.error('Error adding admin:', error);
        throw error;
    }
}
async function createTask(user, task, completed) {
    try {
        const TaskModel = await createTaskModelForUser(user);
        const newTask = new TaskModel({
            task: task,
            completed: completed,
        });
        await newTask.save();
        console.log(`Task "${task}" created successfully for user ${user}.`);
        return newTask;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
}
async function deleteTask(user, task) {
    try {
        const TaskModel = await createTaskModelForUser(user);
        const deletedTask = await TaskModel.findOneAndDelete({ task: task });
        if (!deletedTask) {
            throw new Error('Task not found');
        }
        console.log(`Task "${task}" deleted successfully for user ${user}.`);
        return deletedTask;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
}
async function updateTask(user, task, updatedTaskData) {
    try {
        const TaskModel = await createTaskModelForUser(user);
        const existingTask = await TaskModel.findOne({ task: task });

        if (!existingTask) {
            throw new Error('Task not found');
        }

        const updatedTask = await TaskModel.findOneAndUpdate({ task: task }, updatedTaskData, { new: true });

        if (!updatedTask) {
            throw new Error('Failed to update task');
        }

        console.log(`Task "${task}" updated successfully for user ${user}.`);
        return updatedTask;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
}
async function getTasks(user) {
    try {
        const TaskModel = await createTaskModelForUser(user);
        const tasks = await TaskModel.find();
        console.log(`Tasks for user ${user}:`, tasks);
        return tasks;
    } catch (error) {
        console.error('Error getting tasks:', error);
        throw error;
    }
}
module.exports = { addAdmin, createTask,deleteTask, updateTask, getTasks };


