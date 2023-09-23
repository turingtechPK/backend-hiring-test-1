const mongoose = require('mongoose');

// Connection URL
const uri = 'mongodb+srv://qunmber123:E6OZbllzomiK2iZk@cluster0.tru5myr.mongodb.net/';

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
});

// Get the default connection
const db = mongoose.connection;

// Event handlers for successful connection and error
db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});