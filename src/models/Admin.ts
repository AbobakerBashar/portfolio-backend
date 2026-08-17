import mongoose from "mongoose";
import bcrypt from "bcrypt";

import type { Model } from "mongoose";

interface IAdmin {
	name: string;
	email: string;
	password: string;
	role: "admin";
	isActive: boolean;
	lastLogin?: Date;
}

interface IAdminModel extends Model<IAdmin> {
	login(email: string, password: string): Promise<IAdmin & { _id: string }>;
}

const adminSchema = new mongoose.Schema<IAdmin, IAdminModel>(
	{
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
	},
	{ timestamps: true },
);

adminSchema.pre("save", async function () {
	if (!this.isModified("password")) return;

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

adminSchema.statics.login = async function (email: string, password: string) {
	const user = await this.findOne({ email }).select("+password");
	if (!user) throw Error("Incorrect email");
	const match = await bcrypt.compare(password, user.password);
	if (!match) throw Error("Incorrect password");
	return user;
};

const Admin = mongoose.model<IAdmin, IAdminModel>("User", adminSchema);

export default Admin;
