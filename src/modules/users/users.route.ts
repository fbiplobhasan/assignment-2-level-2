import { Router } from "express";
import { userControllers } from "./users.controllers";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", userControllers.createUser);

router.get("/", auth("admin"), userControllers.getAllUsers);

router.put("/:id", userControllers.updateUser);

// route.get("/",);

export const userRouter = router;
