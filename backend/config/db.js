import mongoose from "mongoose";

const connectWithRetry = async (retries = 3, delay = 2000) => {
  let attempt = 0;

  while (attempt < retries) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connected successfully");
      return;
    } catch (error) {
      attempt++;
      console.error(
        `MongoDB connection attempt ${attempt} failed:`,
        error.message
      );

      if (attempt >= retries) {
        console.error("All connection attempts failed. Exiting...");
        throw error;
      }

      console.log(`Retrying connection in ${delay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

export default connectWithRetry;
