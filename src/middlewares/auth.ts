import jwt from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";
import Config from "../config";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authToken =
    req.headers.authorization ||
    req.query.token ||
    req.headers["x-access-token"];

  if (!authToken) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const token = authToken.split(" ")[1];
    const decoded = jwt.verify(token, Config.jwtSecret);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default verifyToken;
