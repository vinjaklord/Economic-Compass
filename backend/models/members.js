import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const membersSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    favCurrencies: { type: String, required: false },
    timeZone: { type: String, required: false },
    impact: { type: String, required: false },
    favCalc: { type: String, required: false },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const passwordSchema = new Schema(
  {
    password: { type: String, required: true },
    member: { type: mongoose.Types.ObjectId, required: true, ref: 'Member' },
  },
  { timestamps: true }
);

export const Member = mongoose.model('Member', membersSchema);
export const Password = mongoose.model('Password', passwordSchema);
