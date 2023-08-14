const Task = require("../models/Task");
const User = require("../models/User");
const { error, success } = require("../utils/responseWrapper");

const createTaskController = async (req, res) => {
  try {
    const curUserId = req._id;
    const { task } = req.body;

    if (!task) {
      return res.send(error(404, "Task is required."));
    }

    const curUser1 = await User.findById(curUserId).populate("tasks");

    if (!curUser1) {
      return res.send(error(404, "User not found."));
    }

    const newTask = await Task.create({ owner: curUserId, task });

    curUser1.tasks.push(newTask._id);

    await curUser1.save();

    const curUser = await User.findById(curUserId).populate("tasks");

    return res.send(success(200, { curUser }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const deleteTaskController = async (req, res) => {
  try {
    const curUserId = req._id;
    const { taskId } = req.body;

    if (!taskId) {
      return res.send(error(404, "Task id is required."));
    }

    const curUser1 = await User.findById(curUserId).populate("tasks");

    if (!curUser1) {
      return res.send(error(404, "User not found."));
    }

    await Task.findByIdAndDelete(taskId);

    const index = curUser1.tasks.findIndex(
      (task) => task._id.toString() === taskId
    );

    curUser1.tasks.splice(index, 1);

    await curUser1.save();

    const curUser = await User.findById(curUserId).populate("tasks");

    return res.send(success(200, { curUser }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const updateTaskController = async (req, res) => {
  try {
    const curUserId = req._id;
    const { newTask, taskId } = req.body;

    const task = await Task.findById(taskId);

    if (newTask) {
      task.task = newTask;
    }

    await task.save();

    const curUser = await User.findById(curUserId).populate("tasks");
    return res.send(success(200, { curUser }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

module.exports = {
  createTaskController,
  deleteTaskController,
  updateTaskController,
};
