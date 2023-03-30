require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

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

const generateAiResponse = async (req, res) => {
  const messages = req.body.conversation;
  const aiResponse = await getAiResponse(messages);
  res.json(aiResponse);
};

module.exports = { generateAiResponse };
