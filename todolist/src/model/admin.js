const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: false });

const AdminSchema = mongoose.model('AdminLogin', adminSchema);

async function createTaskModelForUser(username) {
    try {
        const taskSchema = new mongoose.Schema({
            task: {
                type: String,
                required: true,
                unique: true,
            },
            completed: {
                type: Boolean,
                default: false,
            },
            // user:{
            //     type:mongoose.type.object;
            // }
        }, { timestamps: false });
        const TaskModel = mongoose.models[`${username}_Task`] || mongoose.model(`${username}_Task`, taskSchema);        
        console.log(`Task model created for user ${username}`);
        return TaskModel;
    } catch (error) {
        console.error('Error creating task model for user:', error);
        throw error;
    }
}
module.exports = { AdminSchema, createTaskModelForUser };
