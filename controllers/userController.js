const User = require("../models/User");
const { error, success } = require("../utils/responseWrapper");
const cloudinary = require("cloudinary").v2;

const getMyProfile = async (req, res) => {
  try {
    const curUserId = req._id;

    const curUser = await User.findById(curUserId).populate("tasks");

    if (!curUser) {
      return res.send(error(404, "User not found."));
    }

    return res.send(success(200, { curUser }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const updateMyProfile = async (req, res) => {
  try {
    const curUserId = req._id;
    const { name, image } = req.body;

    const curUser = await User.findById(curUserId).populate("tasks");

    if (!curUser) {
      return res.send(error(404, "User not found."));
    }

    if (name) {
      curUser.name = name;
    }

    if (image) {
      const cloudImg = await cloudinary.uploader.upload(image, {
        folder: "profileImg",
      });

      curUser.avatar = {
        url: cloudImg.secure_url,
        publicId: cloudImg.public_id,
      };
    }

    await curUser.save();

    return res.send(success(200, { curUser }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

module.exports = {
  getMyProfile,
  updateMyProfile,
};
