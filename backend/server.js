const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/ashas', require('./routes/ashas'));
app.use('/api/patients', require('./routes/patients'));
app.use('/api/cards', require('./routes/cards'));
app.use('/api/vaccinations', require('./routes/vaccinations'));
app.use('/api/visits', require('./routes/visits'));

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: '✅ SwasthyaSaathi Backend API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      ashas: '/api/ashas',
      patients: '/api/patients',
      cards: '/api/cards',
      vaccinations: '/api/vaccinations',
      visits: '/api/visits'
    }
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Server Error',
    error: err.message 
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📍 API: http://localhost:${PORT}`);
  console.log(`🔗 MongoDB: ${process.env.MONGODB_URI}`);
});
