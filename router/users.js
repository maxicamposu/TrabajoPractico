import { Router } from "express";
import { userController } from "../controller/users.js";
import { token } from "../services/jwt.js";
export const router = Router();

//Lista de Usuarios. Control de acceso por token.
router.get("/", token.validate, userController.getAllUsers);

//Alta de usuarios
router.post("/register", userController.registerUser);

//Login de usuarios
router.post("/login", userController.loginUser);
