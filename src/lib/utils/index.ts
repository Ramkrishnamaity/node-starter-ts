import { Validator } from "node-input-validator";
import jwt from "jsonwebtoken";
import { Transporter, createTransport } from "nodemailer";

export const StatusCode = {
	SUCCESS: 200,
	VALIDATION_ERROR: 422,
	SERVER_ERROR: 500,
	DUPLICATE_KEY_ERROR: 409,
	BAD_REQUEST: 400,
	AUTH_ERROR: 401,
	NOT_FOUND_ERROR: 404,
	LOGOUT: 419
};

export const InputValidator = async (input: object, rules: object): Promise<void> => {
	return new Promise((resolve, reject) => {
		const v = new Validator(input, rules);

		v.check()
			.then((match: boolean) => {
				if (!match) {
					const error = (Object.values(v.errors)[0] as any).message;
					reject(error);
				} else {
					resolve();
				}
			})
			.catch((error: any) => {
				reject(error);
			});

	});
};

export const MailSender = async (email: string, title: string, body: string): Promise<boolean> => {
	try {
		const host = process.env.MAIL_HOST;
		const user = process.env.MAIL_USER;
		const pass = process.env.MAIL_PASS;

		const configOptions = {
			host: host,
			port: 465,
			secure: true,
			auth: {
				user: user,
				pass: pass
			}
		};
		const transporter: Transporter = createTransport(configOptions);
		await transporter.sendMail({
			from: "RhythmChat ORG.",
			to: `${email}`,
			subject: `${title}`,
			html: `${body}`
		});
		return true;
	} catch (error) {
		console.log("Error in Mail Send: ", error);
		return false;
	}
};

export default function generateToken(payload: { _id: string }, expiresIn: string = "1d") {
	return jwt.sign(payload, process.env.JWT_SECRET ?? "", { expiresIn });
}