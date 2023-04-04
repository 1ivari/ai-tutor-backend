require('dotenv').config();
const express = require('express');
const app = express();
// const path = require('path');
const cors = require('cors');
// const corsOptions = require('./config/corsOptions');
// const { logger } = require('./middleware/logEvents');
const { errorHandler } = require('./middleware/errorMiddleware');
// const verifyJWT = require('./middleware/verifyJWT');
// const cookieParser = require('cookie-parser');
// const credentials = require('./middleware/credentials');
const { connectDB } = require('./config/db');
const { Pool } = require('pg');
const PORT = process.env.PORT || 3000;

// Connect to PostgreSQL
connectDB();

// built-in middleware for json
app.use(express.json());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
// app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors());

// Errorhandler
app.use(errorHandler);

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api', require('./routes/gptRoutes'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
