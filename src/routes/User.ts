import { Router } from "express";
import UserProfileController from "../controllers/user/Profile";

const ApiRouter: Router = Router();

ApiRouter.get("/profile", UserProfileController.getUserProfile);

export default ApiRouter;