import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import workspaceRoutes from './routes/workspaces.routes';
import boardRoutes from './routes/boards.routes';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 3001;

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use('/api/workspaces', workspaceRoutes)
app.use('/api/boards',     boardRoutes)
// app.use('/api/columns',    columnRoutes)
// app.use('/api/cards',      cardRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});