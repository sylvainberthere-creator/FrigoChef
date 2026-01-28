import { Request, Response } from "express";
import Fridge from "../models/Fridge";

// ===============================
// GET /fridge
// ===============================
export const getFridge = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Non autorisé" });
    }

    const userId = req.user.id;

    const fridge = await Fridge.findOne({ userId });

    if (!fridge) {
      return res.status(200).json({ items: [] });
    }

    // tri par date de péremption
    const sortedItems = fridge.items.sort(
      (a, b) => new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime()
    );

    res.status(200).json({ items: sortedItems });
  } catch (error) {
    console.error("getFridge error:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ===============================
// POST /fridge/add
// ===============================
export const addToFridge = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Non autorisé" });
    }

    const userId = req.user.id;
    const { ingredient, quantity, unit, expiresAt } = req.body;

    if (!ingredient?.label) {
      return res.status(400).json({ error: "Ingrédient invalide" });
    }

    let fridge = await Fridge.findOne({ userId });

    if (!fridge) {
      fridge = new Fridge({
        userId,
        items: [],
      });
    }

    fridge.items.push({
      ingredient,
      quantity: quantity ?? 1,
      unit: unit ?? "pièce",
      expiresAt: new Date(expiresAt),
      addedAt: new Date(),
    });

    await fridge.save();

    res.status(201).json({ message: "Ingrédient ajouté" });
  } catch (error) {
    console.error("addToFridge error:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ===============================
// DELETE /fridge/:itemId
// ===============================
export const removeFromFridge = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Non autorisé" });
    }

    const userId = req.user.id;
    const { itemId } = req.params;

    const fridge = await Fridge.findOne({ userId });
    if (!fridge) {
      return res.status(404).json({ error: "Frigo introuvable" });
    }

    fridge.items = fridge.items.filter(
      (item) => item._id.toString() !== itemId
    );

    await fridge.save();

    res.status(200).json({ message: "Item supprimé" });
  } catch (error) {
    console.error("removeFromFridge error:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
