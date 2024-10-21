import { Router } from "express"
import UserProfileController from "../controllers/user/Profile"


const UserRouter: Router = Router()


UserRouter.get("/profile", UserProfileController.getUserProfile)


export default UserRouter