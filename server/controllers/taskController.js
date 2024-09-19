import TaskModel from '../models/Task.js';
import asyncHandler from 'express-async-handler';

/********** Creating new task *********/
export const createTask = asyncHandler(async (req, res) => {
    try {
        const { title, desc, duedate, status,priority } = req.body;
        const newTask = new TaskModel({
            title,
            desc,
            duedate: duedate || Date.now(),
            status: status || 'todo',
            priority : priority  || 'medium',
            user: req.user._id
        });
        const savedTask = await newTask.save();
        res.status(201).json({ message: "Task created successfully", task: savedTask });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to create task" });
    }
});

/********** Getting all tasks *********/
export const getAllTasks = asyncHandler(async (req, res) => {
    const query = req.query.status ? { status: req.query.status } : {};
    const userId = req.query.userId;
    const priority = req.query.priority;
    const sortBy = req.query.sortBy || 'asc';
    if (req.query.status) {
        query.status = req.query.status;
    }

    if (priority) {
        query.priority = priority;
    }
    try {
        const allTasks = await TaskModel.find({ user: userId, ...query })
                          .sort({priority : sortBy==='asc' ? 1: -1, createdAt: -1 });
        res.status(200).json({ message: "Task fetched successfully", tasks: allTasks });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch tasks" });
    }
});

/********** Getting single task by id *********/
export const getTaskById = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Invalid task ID" });
    }
    try {


        const singleTask = await TaskModel.findById(id)

        if (!singleTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (!singleTask.user.equals(userId)) {
            return res.status(401).json({ message: "You are only allowed to view your own task" });

        }
        res.status(200).json({ singleTask });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch single task" });
    }
});


/********** Getting single task by id *********/
export const updateTaskById = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { id } = req.params;
    const { title, desc, duedate, status,priority  } = req.body;

    try {
        const task = await TaskModel.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (!task.user.equals(userId)) {
            return res.status(403).json({ message: "You are not authorized to update this task" });

        }

        task.title = title || task.title;
        task.desc = desc || task.desc;
        task.duedate = duedate || task.duedate;
        task.status = status || task.status;
        task.priority = priority || task.priority; 
        await task.save();

        res.status(200).json({ message: "Task updated successfully", task: task });
    } catch (error) {
        res.status(500).json({ message: "Failed to update task" });
    }
});


/********** Getting single task by id *********/
export const deleteTaskById = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { id } = req.params;

    try {
        const task = await TaskModel.findById(id)
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        if (!task.user.equals(userId)) {
            return res.status(403).json({ message: "You are not authorized to delete this task" });

        }
        await TaskModel.findByIdAndDelete(id)
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete task" });
    }
});   