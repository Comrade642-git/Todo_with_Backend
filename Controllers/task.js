import { Task } from "../Models/task.js";
import errorhandler from "../middlewares/Error.js";

export const createtask = async (req, res) => {
    try {
        const { title, description } = req.body;
        await Task.create({
            title,
            description,
            user_id: req.user.id
        })

        res.status(201).json({
            success: true,
            message: "Task Created Successfully"
        })
    } catch (error) {
        next(error);
    }
}

export const getalltasks = async (req, res) => {
    try {
        const userid = req.user._id;
        const tasks = await Task.find({ user_id: userid });

        res.status(201).json({
            success: true,
            tasks
        })
    } catch (error) {
        next(error);
    }
}

export const updatetask = async (req, res, next) => {

    try {
        const task = await Task.findById(req.params.id);
        if (!task) return next(new errorhandler("Task not found", 404));
        task.isCompleted = !task.isCompleted;
        await task.save();
        res.status(201).json({
            success: true,
            message: "Task Updated"
        })
    } catch (error) {
        next(error);
    }
}

export const deletetask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return next(new errorhandler("Task not found", 404));
        await task.deleteOne();
        res.status(201).json({
            success: true,
            message: "Task Deleted"
        })
    } catch (error) {
        next(error);
    }
}