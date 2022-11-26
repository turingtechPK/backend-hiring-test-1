import mongoose from "mongoose";

const DATABASE_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

/**
 * make connection with mongodb
 */
export function connectMongoDB(): void {
  mongoose.connect(DATABASE_CONNECTION_STRING);

  const db = mongoose.connection;
  db.on(
    "error",
    console.error.bind(console, "Unable to connect with database")
  );
  db.once("open", () => {
    console.log("Successfully connect with database.");
  });
}
