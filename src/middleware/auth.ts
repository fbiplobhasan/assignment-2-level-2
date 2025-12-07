import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

interface JwtPayloadCustom {
  id: string;
  role: string;
}

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res
          .status(401)
          .json({ success: false, message: "No token provided" });
      }

      // const token = authHeader.split(" ")[1];

      // if (!token) {
      //   return res
      //     .status(401)
      //     .json({ success: false, message: "Invalid token format" });
      // }

      if (!config.jwtSecret) {
        throw new Error("JWT Secret is missing,");
      }
      const decoded = jwt.verify(token, config.jwtSecret!) as JwtPayloadCustom;

      req.user = decoded;

      // Role checking
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: "Access denied.",
        });
      }

      next();
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
};

export default auth;
