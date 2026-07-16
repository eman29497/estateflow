import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import propertyRoutes from "./routes/propertyRoutes";
import authRoutes from "./routes/authRoutes";
import inquiryRoutes from "./routes/inquiryRoutes";

dotenv.config();

const app: Application = express();

app.use(cors({
  origin:   "https://estateflow-five-tau.vercel.app",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Real Estate Backend Running Successfully",
  });
});

app.use("/api/properties", propertyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/inquiries", inquiryRoutes);

const PORT = process.env.PORT || 10000;
app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Server is running on PORT ${PORT}`);
});