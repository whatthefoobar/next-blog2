import { Schema, model, models, Document } from "mongoose";
import bcrypt from "bcryptjs";

// Interface to define the User model type
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profilePic: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

// interface User {
//   _id: string;
//   username: string;
//   email: string;
//   profilePic?: string;
// }

// Define the User schema
const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Method to compare the entered password with the stored hashed password
UserSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware to hash password before saving the user to the database
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Check if the model exists, otherwise create it
const User = models.User || model<IUser>("User", UserSchema);
export default User;
