const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const auth = require('../middleware/authMiddleware');
const tileController = require('../controllers/tileController');

router.get('/', tileController.getTiles);
router.post('/', auth, upload.single('image'), tileController.addTile);
router.put('/:id', auth, upload.single('image'), tileController.updateTile);
router.delete('/:id', auth, tileController.deleteTile);

module.exports = router;
