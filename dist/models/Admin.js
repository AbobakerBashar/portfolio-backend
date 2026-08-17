import mongoose from "mongoose";
import bcrypt from "bcrypt";
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false,
    },
    role: {
        type: String,
        enum: ["admin"],
        default: "admin",
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    lastLogin: {
        type: Date,
    },
}, { timestamps: true });
adminSchema.pre("save", async function () {
    if (!this.isModified("password"))
        return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
adminSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email }).select("+password");
    if (!user)
        throw Error("Incorrect email");
    const match = await bcrypt.compare(password, user.password);
    if (!match)
        throw Error("Incorrect password");
    return user;
};
const Admin = mongoose.model("User", adminSchema);
export default Admin;
