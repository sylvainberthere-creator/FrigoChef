import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export async function register(req: Request, res: Response) {
  const { firstName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email déjà utilisé" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ firstName, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id, firstName: user.firstName }, JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log(token)
    res.status(201).json({ token, user: { firstName: user.firstName, email: user.email } });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  console.log("🔥 AUTH CONTROLLER LOGIN CALLED");


  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Utilisateur non trouvé" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Mot de passe incorrect" });
    console.log("coucou")

    const token = jwt.sign({ id: user._id, firstName: user.firstName }, JWT_SECRET, {
      expiresIn: "7d",
    });
        console.log("coucou", token)


    res.status(200).json({ user: { firstName: user.firstName, email: user.email } });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
}
