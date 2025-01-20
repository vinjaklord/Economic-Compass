import mongoose from "mongoose";

const economicsSchema = new mongoose.Schema(
  {
    title: String,
    country: String,
    date: String,
    impact: String,
    forecast: String,
    previous: String,
  },
  { strict: false }
);

export const Economics = mongoose.model("Economics", economicsSchema);
