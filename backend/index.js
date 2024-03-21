import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import booksRouter from "./routes/booksRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 3000;
const mongoDBURL = process.env.MOGODB_URL;

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to bookstore backend");
});

app.use("/books", booksRouter);

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
