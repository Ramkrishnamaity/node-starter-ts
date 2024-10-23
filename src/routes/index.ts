import { Router } from "express";
import UserRouter from "./User";
import { middleware } from "../lib/utils/Middleware";
import multer from "multer";
import UploadController from "../controllers/user/Upload";
import UserAuthController from "../controllers/auth/User";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const ApiRouter = Router();

// auth routes
ApiRouter.post("/user/login", UserAuthController.login);
ApiRouter.post("/user/register", UserAuthController.register);

ApiRouter.use(middleware);

ApiRouter.post("/upload", upload.single("file"), UploadController.fileUpload);

ApiRouter.use("/user", UserRouter);

export default ApiRouter;