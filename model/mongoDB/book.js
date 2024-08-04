import { mongoose } from "mongoose";
export const { ObjectId } = mongoose.Types;

const bookSchema = mongoose.Schema(
  {
    title: {type: String, required: true,trim: true},
    author: { type: String, required: true, trim: true },
    editorial: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: [0, "Precio inválido."] }
  },
  { timestamps: true }
);
bookSchema.set("toJSON", {
  transform(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export const Book = mongoose.model("Book", bookSchema);
