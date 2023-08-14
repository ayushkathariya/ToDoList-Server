const router = require("express").Router();
const {
  getMyProfile,
  updateMyProfile,
} = require("../controllers/userController");
const requireUser = require("../middlewares/requireUser");

router.get("/getMyProfile", requireUser, getMyProfile);
router.post("/updateMyProfile", requireUser, updateMyProfile);

module.exports = router;
