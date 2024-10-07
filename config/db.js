const mongoose = require("mongoose");

const connectDB = async () => {
  const connection = await mongoose.connect(
    "mongodb+srv://kartikhirapara800:1bngON3FMlQlC0cn@excelploader.juskv.mongodb.net/?retryWrites=true&w=majority&appName=excelploader"
  );
  console.log(`MongoDB Connected`);
};

module.exports = connectDB;
