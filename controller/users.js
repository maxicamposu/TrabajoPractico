import { User } from "../model/mongoDB/user.js";
import bcrypt from "bcrypt";
import { token } from "../services/jwt.js";
const saltRounds = 10;

export const userController = {


  async getAllUsers(req, res) {
    const userCollection = await User.find();
    userCollection
      ? res.status(200).json({success: true,message: "Lista de Usuarios",data: userCollection, })
      : res.status(404).json({ success: false, message: "No hay usuarios registrados en la base de datos." });
  },




  async registerUser(req, res) {
    const { Name, email } = req.body;
    const password = await bcrypt.hash(req.body.password, saltRounds);
    const data = { Name, email, password };
    const newUser = new User(data);
    try {
      const savedUser = await newUser.save();
      res.status(200).json({ sucess: true, message: "Usuario Registrado", data: savedUser });
    } catch (err) {
      res.status(500).json({ sucess: false, message: "Internal Error: " + err.message });
    }
  },

  async loginUser(req, res) {
    const user = await User.find().where({ email: req.body.email });
    if (!user.length) {
      return res.status(401).json({ success: false, message: "Email o contraseña incorrecta" });
    }

    const hashedPassword = user[0].password;
    const match = await bcrypt.compare(req.body.password, hashedPassword);
    if (!match) {
      return res.status(401).json({ success: false, message: "Email o contraseña incorrecta" });
    }

    const accessToken = await token.generate(user[0]);
    res.status(200).json({ sucess: true, message: "user logged in", data: accessToken });
  }
};
