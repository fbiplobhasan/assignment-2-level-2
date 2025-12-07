import { Request, Response } from "express";
import { vehicleServices } from "./vehicles.services";

const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.createVehicle(req.body);
    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getVehicle();

    if (result.rows.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No vehicle found",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getSingleVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getSingleVehicle(req.params.id!);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found.",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle retrieved successful.",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = req.body;

  const vData = {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  };

  try {
    const result = await vehicleServices.updateVehicle(vData, req.params.id!);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found.",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle updated successful.",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const vehicleControllers = {
  createVehicle,
  getUser,
  getSingleVehicle,
  updateVehicle,
};
