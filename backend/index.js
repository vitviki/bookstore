import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
const mongoDBURL = process.env.MOGODB_URL;

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to bookstore backend");
});

// DB Connect
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("DB connection status: SUCCESS");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("DB connection: FAILED");
    console.log(error);
  });
