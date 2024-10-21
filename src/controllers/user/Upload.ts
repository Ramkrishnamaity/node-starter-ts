import { Request, Response } from "express"
import { Res } from "../../lib/types/Common"
import { ResponseCode } from "../../lib/utils/ResponseCode"
import { FileUploadResponce } from "../../lib/types/Responses/User/Upload"
import BucketUpload from "../../lib/utils/Bucket"


const fileUpload = async (req: Request, res: Response<Res<FileUploadResponce>>): Promise<void> => {
	try {
		if (req.file) {

			const id = req.user?._id
			const type = req.file.mimetype.split('/')
			const fileName = `${Date.now()}.${type[1]}`
			const directory = `${id}/${type[0]}/${fileName}`

			await BucketUpload.pushOnBucket(req.file, directory)

			const url = `${process.env.DIGITALOCEAN_SPACES_URL}/${directory}`

			res.status(ResponseCode.SUCCESS).json({
				status: true,
				message: "File Uploaded Successfully.",
				data: {
					url
				}
			})

		} else {
			res.status(ResponseCode.NOT_FOUND_ERROR).json({
				status: false,
				message: "File Not Found."
			})
		}
	} catch (error) {
		res.status(ResponseCode.SERVER_ERROR).json({
			status: false,
			message: "Server Error",
			error
		})
	}
}


const UploadController = {
	fileUpload
}

export default UploadController