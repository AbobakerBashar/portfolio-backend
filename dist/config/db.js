import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};
