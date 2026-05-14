import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use("/api/users", userRoutes);

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(cookieParser());

app.use("/api/auth", authRoutes);