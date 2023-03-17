const ratePatchValidation = (req, res, next) => {
    const { rate } = req.body;
  
    if (typeof rate === 'undefined') {
      return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    console.log('entrei');
    const rateAuth = Number.isInteger(rate) && rate >= 1 && rate <= 5;
    if (!rateAuth) {
      return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }
  
    next();
  };

module.exports = ratePatchValidation;