import express, { Application } from "express";
import path from "path";
import cors from "cors";
import logger from "morgan";
import RootApiRouter from "./routes/index";
import { connectDB } from "./lib/config/Database";

const PORT = process.env.PORT || 4080;

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(logger("dev"));
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);

connectDB();

app.use("/api/v1", RootApiRouter);

app.listen(PORT, () => {
	console.log(`App is running at port ${PORT}`);
});
