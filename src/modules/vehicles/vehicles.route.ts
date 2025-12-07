import { Router } from "express";
import { vehicleControllers } from "./vehicles.controllers";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", auth("admin"), vehicleControllers.createVehicle);

router.get("/", vehicleControllers.getUser);

export const vehicleRouter = router;
