import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import welcome from "./routes/welcome";
import session from "express-session";
import cookieParser from "cookie-parser";
import postRoutes from "./routes/post";
import dotenv from "dotenv";

dotenv.config();
const origins = [
    "http://localhost:3000",
    "https://capstone-project-frontend.vercel.app",
];
const app = express();
app.use(
    cors({
        origin: origins,
    })
);
app.use(
    session({
        secret: "s3tctfeyfeufnwek",
        saveUninitialized: true,
        resave: true,
        cookie: {
            httpOnly: true,
            secure: true,
        },
    })
);
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(
    "mongodb+srv://admin:3mi11MKJK@cluster0.4jqk5.mongodb.net/database?retryWrites=true&w=majority",
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    () => console.log("MongoDB Sucesfully connected")
);
app.get("/cookie", (_req, res) => {
    const options = {
        secure: false,
        httpOnly: false,
        withCredetials: true,
        domain: "http://localhost:3000",
    };
    return res
        .cookie("cookieName", "cookieValue", options)
        .status(200)
        .send("cookie sent");
});

app.use("/api", authRoutes);
app.use("/api", welcome);
app.use("/api", postRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
