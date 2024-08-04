import express from "express";
import "dotenv/config";

import "./config/db.js";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

import { router as booksRouter } from "./router/books.js";
import { router as usersRouter } from "./router/users.js";

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, (err) => {
  console.log(
    err
      ? `Error launching server: ${err.message}`
      : `Server running on port http://localhost:${PORT} \n
    Ctrl + C to exit...`
  );
});


app.use("/api/books", booksRouter);
app.use("/api/users", usersRouter);

