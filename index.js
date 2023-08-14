const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./dbConnect");
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const taskRouter = require("./routers/taskRouter");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

dotenv.config("./.env");

// Configuration
cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

//middlewares
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "https://to-do-list-client-omega.vercel.app/",
    credentials: true,
  })
);

// routers
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/task", taskRouter);
app.get("/", (req, res) => {
  return res.status(200).send("OK from Server");
});

const PORT = process.env.PORT || 4001;

dbConnect();
app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
