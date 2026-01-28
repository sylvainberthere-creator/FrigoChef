import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token manquant" });
  }

  try {
    const token = authHeader.split(" ")[1];
    console.log("coucou")
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "changeme"
    ) as { id: string; email?: string };

    console.log(token)
    console.log("decoded :", decoded)
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch {
    return res.status(401).json({ error: "Token invalide" });
  }
};
