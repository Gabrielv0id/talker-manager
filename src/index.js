const express = require('express');
const readJsonData = require('./utils/readJsonData');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';
const JSON_PATH = './src/talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const data = await readJsonData(JSON_PATH);

  return res.status(200).json(data);
});

app.listen(PORT, () => {
  console.log('Online');
});
