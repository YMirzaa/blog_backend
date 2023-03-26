require('dotenv').config();

const mongoose = require('mongoose');

// Set up default mongoose connection

// Set up mongoose connection
const dev_db_url =
    'mongodb+srv://your_user_name:your_password@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority';
// eslint-disable-next-line no-undef
const mongoDB = process.env.MONGO_BLOG_URL || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
