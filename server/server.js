require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const authRoutes = require('./routes/authRoutes');
const tileRoutes = require('./routes/tileRoutes');


const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint (no DB dependency)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/tiles', tileRoutes);

// Serve built client when available. Controlled by NODE_ENV=production or SERVE_CLIENT=true
const publicPath = path.join(__dirname, 'public');
if (process.env.SERVE_CLIENT === 'true' || process.env.NODE_ENV === 'production') {
  if (fs.existsSync(publicPath)) {
    app.use(express.static(publicPath));
    // SPA fallback: serve index.html for all non-API routes
    app.get('*', (req, res) => {
      if (req.path.startsWith('/api/')) return res.status(404).end();
      return res.sendFile(path.join(publicPath, 'index.html'));
    });
    console.log('Serving client from', publicPath);
  } else {
    console.log('Public path not found, skipping static serving:', publicPath);
  }
}

const PORT = process.env.PORT || 5000;
// Start the server regardless of DB connectivity so static site is always served.
const server = app.listen(PORT, ()=> console.log('Server running on port', PORT));

// Connect to MongoDB with retry logic
let mongoConnected = false;
const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoConnected = true;
    console.log('✓ MongoDB connected');
  } catch (err) {
    mongoConnected = false;
    console.error('✗ MongoDB connection error:', err.message);
    // Retry connection every 10 seconds
    setTimeout(connectMongo, 10000);
  }
};

connectMongo();

