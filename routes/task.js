import express from "express"
import { createtask, getalltasks, updatetask, deletetask } from "../Controllers/task.js";
import { Authentication } from "../middlewares/Auth.js"
const Router = express.Router();

Router.post("/new", Authentication, createtask);
Router.get("/mytasks", Authentication, getalltasks);
Router.route("/:id")
    .put(Authentication, updatetask)
    .delete(Authentication, deletetask);
export default Router;