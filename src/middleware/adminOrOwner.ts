import { NextFunction, Request, Response } from "express";

const adminOrOwner = (req: Request, res: Response, next: NextFunction) => {
  const loggedInUser = req.user;

  if (!loggedInUser) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized, no user found",
    });
  }

  const paramId = req.params.id;

  if (loggedInUser.role === "admin") return next();
  
  if (loggedInUser.id === paramId) return next();

  return res.status(403).json({
    success: false,
    message: "You are not allowed to update this profile",
  });
};

export default adminOrOwner;
