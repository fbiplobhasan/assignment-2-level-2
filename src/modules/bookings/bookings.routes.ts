import { Router } from "express";
import { bookingControllers } from "./bookings.controllers";
import auth from "../../middleware/auth";
import adminOrOwner from "../../middleware/adminOrOwner";

const router = Router();

router.post("/", auth(), adminOrOwner, bookingControllers.createBooking);

router.get("/", auth(), adminOrOwner, bookingControllers.getAllBookings);

router.put("/:id", auth(),adminOrOwner, bookingControllers.updateBooking);

export const bookingRouter = router;
