import { Router } from "express";
import { vehicleControllers } from "./vehicles.controllers";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", auth("admin"), vehicleControllers.createVehicle);

router.get("/", vehicleControllers.getUser);

router.get("/:id", vehicleControllers.getSingleVehicle);

router.put("/:id", vehicleControllers.updateVehicle);

router.delete("/:id", vehicleControllers.deleteVehicle);

export const vehicleRouter = router;
