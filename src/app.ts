import express, { Request, Response } from "express";
import initDB from "./config/db";
import { userRouter } from "./modules/users/users.route";
import { vehicleRouter } from "./modules/vehicles/vehicles.route";
import { authRouter } from "./modules/auth/auth.routes";

export const app = express();

app.use(express.json());

initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from express server.");
});

app.use("/api/v1/users", userRouter);

app.use("/api/v1/vehicles", vehicleRouter);

app.use("/api/v1/auth",authRouter)

// app.use("/api/v1/bookings")

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
    path: req.path,
  });
});

export default app;
