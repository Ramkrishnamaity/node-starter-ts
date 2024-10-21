import { Request, Response } from "express"
import { Res } from "../../lib/types/Common"
import { ResponseCode } from "../../lib/utils/ResponseCode"
import UserModel from "../../models/User"
import { Types } from "mongoose"
import { ProfileResponceType } from "../../lib/types/Responses/User"


const getUserProfile = async (req: Request, res: Response<Res<ProfileResponceType>>): Promise<void> => {
	try {

		const userData = await UserModel.aggregate([
			{
				$match: {
					_id: new Types.ObjectId(req.user?._id)
				}
			},
			{
				$project: {
					deviceToken: 0,
					password: 0,
					createdOn: 0,
					isDeleted: 0,
					__v: 0
				}
			}
		])

		userData.length !== 0 ?
			res.status(ResponseCode.SUCCESS).json({
				status: true,
				message: "User Profile Fetched Successfully",
				data: userData[0]
			}) :
			res.status(ResponseCode.NOT_FOUND_ERROR).json({
				status: false,
				message: "User Not Found!"
			})

	} catch (error) {
		res.status(ResponseCode.SERVER_ERROR).json({
			status: false,
			message: "Server Error!",
			error
		})
	}
}


const UserProfileController = {
	getUserProfile
}

export default UserProfileController