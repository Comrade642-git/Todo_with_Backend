import mongoose from "mongoose"
const taskchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createat: {
        type: Date,
        default: Date.now,
    },
});

export const Task = mongoose.model("Task", taskchema);