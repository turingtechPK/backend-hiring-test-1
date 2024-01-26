import dotenv from "dotenv";
dotenv.config();

const config = {
  mongodbURL: process.env.MONGODB_URL,
  port: process.env.PORT || 5000,
};

export default config;
