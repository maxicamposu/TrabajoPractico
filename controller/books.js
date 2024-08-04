import { Book } from "../model/mongoDB/book.js";

export const bookController = {
  async getAllBooks(req, res) {
    const bookCollection = await Book.find();
    bookCollection
      ? res.status(200).json({success: true,message: "Lista de libros",   data: bookCollection})
      : res.status(404).json({ success: false, message: "Base de datos de libros vacías" });
  },
  async getBookByTitle(req, res) {
    const { title } = req.query;
    if (!title)
      res.status(400).json({ success: false, message: "Missing 'title' query param" });

    try {
      const books = await Book.find({
        title: { $regex: title, $options: "i" },
      });
      if (!books.length) {
        return res.status(404).json({success: false,message: `No se encontraron libros con ${title}  en el título` });
      }

      return res.status(200).json({success: true,  message: "Libros por titulo",  data: books });
    } catch (err) {
      return res.status(500).json({ success: false, message: `Internal Error: ${err.message}` });
    }
  },

  async createBook(req, res) {
    const { title, author, editorial, price } = req.body;
    try {
      const newbook = new Book({
        title,
        author,
        editorial,
        price
      });
      const savedbook = await newbook.save();
      res.status(200).json({ success: true, message: "Libro creado", data: savedbook });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async updateBook(req, res) {
    const allowedFields = [
      "title",
      "author",
      "editorial",
      "price"
    ];
    try {
      const updates = Object.keys(req.body);
      const isValidOperation = updates.every((update) =>
        allowedFields.includes(update)
      );
      if (!isValidOperation) {
        return res.status(400).json({success: false,message: "Invalid field.", });
      }

      const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!book) {
        return res.status(404).json({success: false, message: `Libro no encontrado`});
      }
      res.status(200) .json({ success: true, message: "Libro actualizado", data: book });
    } catch (error) {
      res.status(500).json({ success: false,message: `Internal Server Error ${error.message}` });
    }
  },

  async deleteBook(req, res) {

    try {
      const books = await Book.findByIdAndDelete(req.params.id);
      
      if (!books) {
        return res.status(404).json({success: false, message: `Libro no encontrado` });
      }
      res.sendStatus(204);
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
};
