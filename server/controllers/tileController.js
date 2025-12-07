const Tile = require('../models/Tile');
const cloudinary = require('../utils/cloudinary');

exports.getTiles = async (req, res) => {
  try {
    const { q } = req.query;
    const filter = {};
    if (q) {
      const re = new RegExp(q, 'i');
      filter.$or = [{ name: re }, { brand: re }];
    }
    const tiles = await Tile.find(filter).sort({ createdAt: -1 });
    res.json(tiles);
  } catch (err) {
    console.error('getTiles error', err);
    res.status(500).json({ message: err.message });
  }
};

exports.addTile = async (req, res) => {
  try {
    const { name, price, size, surface, brand } = req.body;
    // multer puts file in req.file (memoryStorage)
    let imageUrl = '';
    if (req.file && req.file.buffer) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: 'karma-studios' }, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        });
        stream.end(req.file.buffer);
      });
      imageUrl = result.secure_url;
    }
    const tile = new Tile({ name, price, size, surface, brand, imageUrl });
    await tile.save();
    res.json(tile);
  } catch (err) {
    console.error('addTile error', err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateTile = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    if (req.file && req.file.buffer) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: 'karma-studios' }, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        });
        stream.end(req.file.buffer);
      });
      update.imageUrl = result.secure_url;
    }
    const tile = await Tile.findByIdAndUpdate(id, update, { new: true });
    res.json(tile);
  } catch (err) {
    console.error('updateTile error', err);
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTile = async (req, res) => {
  try {
    const { id } = req.params;
    await Tile.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    console.error('deleteTile error', err);
    res.status(500).json({ message: err.message });
  }
};
