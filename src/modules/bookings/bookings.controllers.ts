import { Request, Response } from "express";
import { bookingServices } from "./bookings.services";

const createBooking = async (req: Request, res: Response) => {
  try {
    const booking = await bookingServices.createBooking(req.body);
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  try {
    let result;
    if (req.user!.role === "admin") {
      result = await bookingServices.getAllBookingsAdmin();
    } else {
      result = await bookingServices.getAllBookingCustomer(req.user!.id);
    }

    res.status(200).json({
      success: true,
      message:
        req.user!.role === "admin"
          ? "All bookings retrieved successfully"
          : "Your bookings retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  try {
    const updatedBooking = await bookingServices.updateBooking(
      req.params.id!,
      req.body.status
    );

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    res.status(200).json({
      success: true,
      message:
        req.body.status === "cancelled"
          ? "Booking cancelled successfully"
          : "Booking marked as returned. Vehicle is now available",
      data: updatedBooking,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const bookingControllers = {
  createBooking,
  getAllBookings,
  updateBooking,
};
