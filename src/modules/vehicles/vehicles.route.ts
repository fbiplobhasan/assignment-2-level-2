import { Router } from "express";
import { vehicleControllers } from "./vehicles.controllers";
import auth from "../../middleware/auth";
import adminOrOwner from "../../middleware/adminOrOwner";

const router = Router();

router.post("/", auth(), adminOrOwner, vehicleControllers.createVehicle);

router.get("/", vehicleControllers.getUser);

router.get("/:id", vehicleControllers.getSingleVehicle);

router.put("/:id", auth(), adminOrOwner, vehicleControllers.updateVehicle);

router.delete("/:id", auth(), adminOrOwner, vehicleControllers.deleteVehicle);

export const vehicleRouter = router;
