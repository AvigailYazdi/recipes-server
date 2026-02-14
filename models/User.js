import mongoose from "mongoose"
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, match: [/^\S+@\S+\.\S+$/, "Invalid email address"] },
    passwordHash: { type: String, required: true, select: false, minlength: 6 },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe"
    }]

}, { timestamps: true });

userSchema.pre("save", function () {
  if (!this.isModified("passwordHash")) return;

  const saltRounds = bcrypt.genSaltSync(10);
  this.passwordHash = bcrypt.hashSync(this.passwordHash, saltRounds);
});

export const User = mongoose.model("User", userSchema);