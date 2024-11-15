const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  mrp: { type: Number, required: true },
  sellPrice: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false }
});


const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
