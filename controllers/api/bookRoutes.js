const router = require('express').Router();
const { Books } = require('../../models');
const withAuth = require('../../utils/auth');

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

// Remove a book from the user's library
router.delete('/', withAuth, async(req, res) => {
try {
    const newBook = await Books.destroy({
        where: {
            id: req.params.id,
            user_id: req.session.user_id,
        },
    });

    if (!bookData) {
        res.status(404).json({ message: 'No book found with this id'});
        return;
    }

    res.status(200).json(newBook);
} catch (err) {
    res.status(500).json(err);
}
});

  module.exports = router;