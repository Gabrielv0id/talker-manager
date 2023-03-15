const fs = require('fs').promises;

const JSON_PATH = './src/talker.json';

const readJsonData = async () => {
  try {
      const data = await fs.readFile(JSON_PATH, 'utf-8');
      return JSON.parse(data);
  } catch (err) {
      throw new Error(`não foi possivel ler o arquivo: ${err.message}`);
  }
};

const filterById = async (id) => {
  const data = await readJsonData();

  const filteredId = data.find((talker) => talker.id === Number(id));
  return filteredId;
};

const writeUserData = async (data) => {
  try {
    return await fs.writeFile(JSON_PATH, JSON.stringify(data, null, 2));
  } catch (err) {
    throw new Error(`não foi possivel inserir o usuario no arquivo: ${err.message}`);
  }
};

module.exports = {
  readJsonData,
  filterById,
  writeUserData,
};
