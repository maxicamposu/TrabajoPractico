import { Router } from "express";
export const router = Router();
import { bookController } from "../controller/books.js";
import { token } from "../services/jwt.js";

// Lista todos los libros
router.get("/",  bookController.getAllBooks);

//Lista los libros por título
router.get("/s",  bookController.getBookByTitle);

//Alta de libros. Control de acceso por token.
router.post("/", token.validate, bookController.createBook);

//Actualización de libros. Control de acceso por token.
router.put("/:id",token.validate, bookController.updateBook);

//Eliminación de libros. Control de acceso por token.
router.delete("/:id",token.validate, bookController.deleteBook);
