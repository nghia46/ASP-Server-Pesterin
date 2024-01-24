import mongoose from "mongoose";

async function connect() {
  try {
    await mongoose.connect("connection string", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch {
    console.log("Error connecting to MongoDB");
  }
}
export default { connect };
