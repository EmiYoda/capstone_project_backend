import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import welcome from "./routes/welcome";
import { MONGO } from "./config/config";
import cookieParser from "cookie-parser";
import postRoutes from "./routes/post";

const app = express();
const origins = [
    "http://localhost:3000",
    "http:192.168.0.16:3000",
    "https://capstone-project-backend-photodb.vercel.app/",
    "https://photodb-backend-capstone.herokuapp.com/",
];
app.use(
    cors({
        origin: origins,
    })
);
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(
    `${MONGO}`,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    () => console.log("MongoDB Sucesfully connected")
);

app.use("/api", authRoutes);
app.use("/api", welcome);
app.use("/api", postRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
