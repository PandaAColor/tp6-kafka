// activation.schema.ts
import { Schema } from 'mongoose';

export const ActivationSchema = new Schema({
  customerId: { type: Number, required: true },
  plan: { type: String, required: true },
  motivo_fallo: { type: String, default: 'ninguno' },
  estado: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});
