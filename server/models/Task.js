import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    duedate: {
        type: String,
        default: Date.now()

    },
    status: {
        type: String,
        enum: ['todo', 'inprogress', 'done'],
        default: 'todo'
    },
    priority: {
        type: String,
        enum: ['high', 'medium', 'low'],
        default: 'medium'
    }


}, { timestamps: true })


const TaskModel = mongoose.model('Task', TaskSchema);

export default TaskModel;