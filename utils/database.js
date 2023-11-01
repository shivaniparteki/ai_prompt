import mongoose from 'mongoose'

async function connectToDatabase() {
  mongoose.set('strictQuery', true)


  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " + err
      );
      process.exit();
    });

  } catch (error) {
    console.log("Something goes wrong!");
    console.log(error);
  }
}

connectToDatabase()

