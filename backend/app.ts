import express, { Express } from "express";
import userRoute from "./routes/userRoute";
import adminRoute from "./routes/adminRoute";
import { pageNotFound, errorHandler } from "./middleware/errorMiddleware";
import connectDB from "./config/config";
const app: Express = express();
import cors from "cors";
import cookie from "cookie-parser";
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookie());
connectDB().catch(err => console.log('Database connection failed', err));

app.use("/api/users", userRoute);
app.use("/api/admin", adminRoute);

app.use(pageNotFound);
app.use(errorHandler);

app.listen(port)

export default app;