import { Router } from "express";
import { userControllers } from "./users.controllers";
import auth from "../../middleware/auth";
import adminOrOwner from "../../middleware/adminOrOwner";

const router = Router();

router.post("/", userControllers.createUser);

router.get("/", auth(), adminOrOwner, userControllers.getAllUsers);

router.put("/:id", auth(), adminOrOwner, userControllers.updateUser);

router.delete("/:id", auth(), adminOrOwner, userControllers.deleteUser);

// route.get("/",);

export const userRouter = router;
