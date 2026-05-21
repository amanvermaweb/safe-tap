import mongoose, { Schema, Document } from 'mongoose';

export interface IRouteStop {
  stopId: mongoose.Types.ObjectId;
  order: number;
  expectedArrivalTime?: string; // ISO time or hh:mm
}

export interface IRoute extends Document {
  routeName: string;
  busId?: mongoose.Types.ObjectId;
  stops: IRouteStop[];
  createdAt: Date;
  updatedAt: Date;
}

const RouteStopSchema = new Schema<IRouteStop>(
  {
    stopId: { type: Schema.Types.ObjectId, ref: 'Stop', required: true },
    order: { type: Number, required: true },
    expectedArrivalTime: { type: String },
  },
  { _id: false }
);

const RouteSchema = new Schema<IRoute>(
  {
    routeName: { type: String, required: true },
    busId: { type: Schema.Types.ObjectId, ref: 'Bus' },
    stops: { type: [RouteStopSchema], default: [] },
  },
  { timestamps: true }
);

export default (mongoose.models.Route as mongoose.Model<IRoute>) || mongoose.model<IRoute>('Route', RouteSchema);
