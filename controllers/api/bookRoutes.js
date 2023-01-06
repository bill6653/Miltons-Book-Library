const router = require('express').Router();
const { Books } = require('../../models');
const withAuth = require('../../utils/auth');


// find all books
router.get('/', async (req, res) => {
   try{
    const books = await Books.findAll();
        res.status(200).json(books);
   } catch (err) {
        res.status(500).json(err);
   }
});

// Find book by id
router.get('/:id', async (req, res) => {
    await Books.findByPk(req.params.id, {
        attributes: ["id", "name", "author", "description", "genre"],
    })
    .then((books) => {
        res.json(books);
    })
    .catch((err) => {
        res.json(err);
    });
});

// Add a book to the user's library
router.post('/', withAuth, async(req, res) => {
    try {
        const newBook = await Books.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newBook);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// Update a book
router.put('/', withAuth, async(req, res) => {
    try {
        const newBook = await Books.update({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!newBook) {
            res.status(404).json({ message: 'No book found with this id'});
            return;
        }
            res.status(200).json(newBook);
        } catch (err) {
            res.status(500).json(err);
        }
    });

// Remove a book from the user's library
router.delete('/:id', async (req, res) => {
    try {
      const bookData = await Books.destroy({
        where: {
          id: req.params.id
        }
      });
      if (!bookData) {
        res.status(404).json({ message: 'No book found with this id!' });
        return;
      }
      res.status(200).json(bookData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;