const express = require('express');
const { getBooks, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const router = express.Router();

router.post('/books', createBook);
router.get('/books', getBooks);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

module.exports = router;
