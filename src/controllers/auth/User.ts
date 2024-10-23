import { Request, Response } from "express";
import { Res } from "../../lib/types/Common";
import { LoginRequestType, RegisterRequestType } from "../../lib/types/Requests/Auth/User";
import generateToken, { InputValidator, StatusCode } from "../../lib/utils";
import { UserLoginResponse } from "../../lib/types/Responses/Auth/User";
import UserModel from "../../models/User";
import bcrypt from "bcrypt";

const login = (req: Request<any, any, LoginRequestType>, res: Response<Res<UserLoginResponse>>): void => {
	try {

		InputValidator(req.body, {
			email: "required",
			password: "required"
		})
			.then(async () => {

				const user = await UserModel.findOne(
					{ email: req.body.email }
				);

				if (!user) {
					res.status(StatusCode.BAD_REQUEST).json({
						status: false,
						message: "User not Found."
					});
				} else {

					if (!bcrypt.compareSync(req.body.password, user.password)) {

						res.status(StatusCode.AUTH_ERROR).json({
							status: false,
							message: "Incorrect Password or User."
						});

					} else {

						const token = generateToken({ _id: user._id.toString() });

						res.status(StatusCode.SUCCESS).json({
							status: true,
							message: "User Logged in Successfully",
							data: {
								token
							}
						});

					}

				}

			})
			.catch(error => {
				res.status(StatusCode.VALIDATION_ERROR).json({
					status: false,
					message: "Invalid Data!",
					error
				});
			});

	} catch (error) {
		res.status(StatusCode.SERVER_ERROR).json({
			status: false,
			message: "Server Error!",
			error
		});
	}
};

const register = (req: Request<any, any, RegisterRequestType>, res: Response<Res>): void => {
	try {

		InputValidator(req.body, {
			name: "required|maxLength:10",
			email: "required|email",
			password: "required|minLength:6"
		})
			.then(async () => {

				const isExist = await UserModel.findOne({ email: req.body.email });
				if (isExist) {

					res.status(StatusCode.BAD_REQUEST).json({
						status: false,
						message: "User Already Registered."
					});

				} else {
					const salt = bcrypt.genSaltSync(10);
					const hashedPassword = bcrypt.hashSync(req.body.password, salt);

					UserModel.create({
						...req.body,
						password: hashedPassword
					}).then(() => {
						res.status(StatusCode.SUCCESS).json({
							status: true,
							message: "User Registered Successfully."
						});
					}).catch((error) => {
						res.status(StatusCode.SERVER_ERROR).json({
							status: false,
							message: "DB Error!",
							error
						});
					});
				}

			})
			.catch(error => {
				res.status(StatusCode.VALIDATION_ERROR).json({
					status: false,
					message: "Invalid Data!",
					error
				});
			});

	} catch (error) {
		res.status(StatusCode.SERVER_ERROR).json({
			status: false,
			message: "Server Error!",
			error
		});
	}
};

const UserAuthController = {
	login,
	register
};

export default UserAuthController;
