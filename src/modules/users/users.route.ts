import { Router } from "express";
import { userControllers } from "./users.controllers";

const router = Router();

router.post("/", userControllers.createUser);

// route.get("/",);

export const userRouter = router;
