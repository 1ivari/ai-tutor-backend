const { Configuration, OpenAIApi } = require('openai');
const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
// const { testConnection } = require('./config/db');

// connect to database
// testConnection();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/api/users', require('./routes/userRoutes')); // Routes
app.use(errorHandler); // Errorhandler

// INIT END

// PostgreSQL stuff
// const pool = new Pool({
//   user: 'iihe',
//   host: 'localhost',
//   database: 'ai-tutor-db',
//   password: process.env.DB_PW,
//   port: 5433,
// });

// pool.connect((err, client, release) => {
//   if (err) {
//     return console.error('Error acquiring client', err.stack);
//   }
//   console.log('Connected to the PostgreSQL database');
// });

// ChatGPT stuff
app.post('/api/generate-response', async (req, res) => {
  const messages = req.body.conversation;
  const aiResponse = await getAiResponse(messages);
  res.json(aiResponse);
});

const getAiResponse = async (messages) => {
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: messages,
    temperature: 0.4,
    max_tokens: 2000,
  });
  console.log(response.data.choices[0].message.content);
  return response.data.choices[0].message.content;
};

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
