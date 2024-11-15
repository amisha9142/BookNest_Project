const Book = require("../models/bookModel");

exports.createBook = async (req, res) => {
  try {
    const { title , author , description , mrp , sellPrice  } = req.body;
    console.log("Request Body:", req.body);

    if (!title || !author || !description || !mrp || !sellPrice) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    const existingBook = await Book.findOne({ title: req.body.title});

    if (existingBook) {
      return res.status(400).json({
        success: false,
        error: "Book already exists",
      });
    }

    const newBook = await Book.create({
      title , 
      author ,
      description ,
      mrp , 
      sellPrice
    });

    const io = req.app.get("io");
    io.emit("newBookNotification", {
      message: `Book ${newBook.title} has been created!`,
      bookId: newBook._id,
      timestamp: new Date()
    });

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: newBook, 
    });
  } catch (error) {
    console.error("Error in createBook:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};


// exports.getBooks = async (req, res) => {
//   const { sortBy } = req.query;
//   try {
//     const books = await Book.find({ isDeleted: false }).sort({
//       sellPrice: sortCriteria,
//     });


//     res.status(200).json({
//       success: true,
//       message: "Books fetched successfully",
//       data: books, 
//     });
//   } catch (error) {
//     console.error("Error in getBooks:", error.message);
//     res.status(500).json({
//       success: false,
//       error: "Internal server error",
//     });
//   }
// };


exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({ isDeleted: false });
    res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      data: books,
    });
  } catch (error) {
    console.error("Error in getBooks:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};


exports.updateBook = async (req, res) => {
  try {
    const { title , author , description , mrp , sellPrice } = req.body;
    const { id } = req.params;

    
    if (!title  || !author || !description || !mrp  || !sellPrice) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    const book = await Book.findByIdAndUpdate(
      id,
      { title , author , description , mrp , sellPrice },
      {
        new: true,
        runValidators: true, 
      }
    );

    if (!book) {
      return res.status(404).json({
        success: false,
        error: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book, 
    });
  } catch (error) {
    console.error("Error in updateBook:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};


exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        error: "Book not found",
      });
    }

   
    await Book.findByIdAndUpdate(id, { isDeleted: true });


    res.status(204).send(); 
  } catch (error) {
    console.error("Error in deleteBook:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
