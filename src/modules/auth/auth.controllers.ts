import { Request, Response } from "express";
import { authServices } from "./auth.services";

const signup = async (req: Request, res: Response) => {
  try {
    const result = await authServices.signup(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authServices.signin(email, password);
    res.status(200).json({
      success: true,
      message: "Login successful.",
      data: result,
    });
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export const authControllers = {
  signin,
  signup,
};
