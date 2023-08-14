const router = require("express").Router();
const {
  createTaskController,
  deleteTaskController,
  updateTaskController,
} = require("../controllers/taskController");
const requireUser = require("../middlewares/requireUser");

router.post("/createTask", requireUser, createTaskController);
router.post("/deleteTask", requireUser, deleteTaskController);
router.put("/updateTask", requireUser, updateTaskController);

module.exports = router;
