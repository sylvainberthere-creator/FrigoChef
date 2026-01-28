// src/models/Fridge.ts
import mongoose, { Schema, Document } from "mongoose";

export interface FridgeDocument extends Document {
  userId: mongoose.Types.ObjectId; // Référence à l'ID de l'utilisateur
  items: any[];
}

const FridgeSchema = new Schema(
  {
    // C'est ICI que se fait le lien. 
    // ref: 'User' dit à Mongoose que cet ID appartient à un utilisateur
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true, 
      unique: true 
    },
    items: [{
      ingredient: { label: String },
      quantity: { type: Number, default: 1 },
      expiresAt: Date,
    }],
  },
  { timestamps: true }
);

export default mongoose.model<FridgeDocument>("Fridge", FridgeSchema);