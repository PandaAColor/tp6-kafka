import { Schema, model } from 'mongoose';

export const ActivationSchema = new Schema(
  {
    customerId: { type: Number, required: true },
    plan: { type: String, required: true },
    motivo_fallo: { type: String, default: 'none' },
    estado: { type: String, default: 'pending' },
    historial: [
      {
        eventId: String,
        eventType: String,
        version: Number,
        occurredAt: Date,
        correlationId: String,
        customerId: String,
        source: String,
        payload: Schema.Types.Mixed,
      },
    ],
  },
  { timestamps: true },
);

export const ActivationModel = model('Activation', ActivationSchema);