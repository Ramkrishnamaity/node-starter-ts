import mongoose, { Document, Schema } from "mongoose";
import { UserModelType } from "../lib/types/Models/User";
import { CommonModelType } from "../lib/types/Models";

const UserSchema = new Schema<UserModelType<CommonModelType & Document["_id"]>>({
	name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "https://e7.pngegg.com/pngimages/867/694/png-clipart-user-profile-default-computer-icons-network-video-recorder-avatar-cartoon-maker-blue-text.png"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const UserModel = mongoose.model<UserModelType<CommonModelType & Document["_id"]>>("users", UserSchema);

export default UserModel;
