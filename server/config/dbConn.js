import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }).then(() => {
            console.log("Connected to MongoDB");
        })
    } catch(err) {
        console.error(err)
    }
}

export default connectDB