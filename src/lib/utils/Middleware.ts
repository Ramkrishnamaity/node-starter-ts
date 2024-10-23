import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Res } from "../types/Common";
import { StatusCode } from ".";

export const middleware = async (req: Request, res: Response<Res>, next: NextFunction): Promise<void> => {
	const authorization: string | undefined = req.headers.authorization;

	if (!authorization) {
		res.status(StatusCode.AUTH_ERROR).json({
			status: false,
			message: "No credentials sent!"
		});
	} else {
		try {

			const decrypted = jwt.verify(authorization, process.env.JWT_SECRET ?? "") as JwtPayload;
			req.user = {
				_id: decrypted._id
			};
			next();

		} catch (error) {
			res.status(StatusCode.AUTH_ERROR).json({
				status: false,
				message: "Your Token is Expired.",
				error
			});
		}
	}
};
