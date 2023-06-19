const { Router } = require('express');
const { getAllBooks, addBook, searchBooks, libraryCount, deleteBook, updateBook, getABook } = require('../controllers/library');

const router = Router();

router.get('/', getAllBooks);
router.get('/book/:bookid', getABook);
router.post('/add', addBook);
router.get('/search', searchBooks);
router.get('/count', libraryCount);
router.post('/delete', deleteBook);
router.post('/update/:bookid', updateBook)

module.exports = router;