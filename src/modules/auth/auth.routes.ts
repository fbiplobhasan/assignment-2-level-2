import { Router } from "express";
import { authControllers } from "./auth.controllers";

const router = Router();

router.post("/signup", authControllers.signup);
router.post("/signin", authControllers.signin);

// route.get("/",);

export const authRouter = router;
