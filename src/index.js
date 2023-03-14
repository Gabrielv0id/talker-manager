const express = require('express');
const hash = require('crypto');
const { readJsonData, filterById } = require('./utils/talkerManagerUtils');
const validationFields = require('./middlewares/validationFields');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const data = await readJsonData();

  return res.status(HTTP_OK_STATUS).json(data);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;

  const fillteredId = await filterById(id);

  if (!fillteredId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(HTTP_OK_STATUS).json(fillteredId);
});

app.post('/login', validationFields, (req, res) => {
  const token = hash.randomBytes(8).toString('hex');
  res.status(200).json({ token });
});
app.listen(PORT, () => {
  console.log('Online');
});
