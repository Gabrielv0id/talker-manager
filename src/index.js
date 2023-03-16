const express = require('express');
const hash = require('crypto');
const { readJsonData, filterById, writeUserData } = require('./utils/talkerManagerUtils');
const validationFields = require('./middlewares/validationFields');
const ageValidation = require('./middlewares/ageValidation');
const nameValidation = require('./middlewares/nameValidation');
const talkAndWatchedValidation = require('./middlewares/talkAndWatchedValidation');
const tokenValidation = require('./middlewares/tokenValidation');
const rateValidation = require('./middlewares/rateValidation');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/search', tokenValidation, async (req, res) => {
  const search = req.query.q;

  const data = await readJsonData();
  if (!search) {
    return res.status(HTTP_OK_STATUS).json(data);
  }
  const searchName = data.filter((person) => person.name.includes(search));
  return res.status(HTTP_OK_STATUS).json(searchName);
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
  res.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker', 
  tokenValidation,
  nameValidation,
  ageValidation,
  talkAndWatchedValidation,
  rateValidation,
  async (req, res) => {
    const user = req.body;
    const data = await readJsonData();
    user.id = data.length + 1;
    data.push(user);
    await writeUserData(data);
    res.status(201).json(user);
  });

app.put('/talker/:id',
tokenValidation,
nameValidation,
ageValidation,
talkAndWatchedValidation,
rateValidation,
async (req, res) => {
  const { id } = req.params;
  const personUpdate = req.body;

  const data = await readJsonData();
  const fillteredPerson = await filterById(id);

  if (!fillteredPerson) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  const personIndex = data.findIndex((person) => person.id === Number(id));
  personUpdate.id = Number(id);

  data[personIndex] = personUpdate;

  await writeUserData(data);
  return res.status(HTTP_OK_STATUS).json(personUpdate);
});

app.delete('/talker/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;
  const data = await readJsonData();

  const personIndex = data.findIndex((person) => person.id === Number(id));

  if (personIndex !== -1) {
    data.splice(personIndex, 1);
    await writeUserData(data);
    return res.status(204).end();
  }
});
app.listen(PORT, () => {
  console.log('Online');
});
