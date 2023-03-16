const { rateAuth } = require('../utils/talkerManagerUtils');

const searchValidation = (req, res, next) => {
    const { rate, date } = req.query;

  const validRate = rateAuth(rate);
  if (rate && !validRate) {
    return res.status(400)
    .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }

  if (date && !/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
    return res.status(400).json({ message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
};
module.exports = searchValidation;