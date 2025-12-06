import { Router } from "express";
import { vehicleControllers } from "./vehicles.controllers";

const router = Router();

router.post("/", vehicleControllers.createVehicle);

// route.get("/",);

export const vehicleRouter = router;
