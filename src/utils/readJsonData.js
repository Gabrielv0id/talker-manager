const fs = require('fs').promises;

const readJsonData = async (path) => {
    try {
        const data = await fs.readFile(path, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        throw new Error(`não foi possivel ler o arquivo: ${err.message}`);
    }
};

module.exports = readJsonData;
