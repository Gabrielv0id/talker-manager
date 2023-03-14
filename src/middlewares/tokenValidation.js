const tokenValidation = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
  return res.status(401).json({ message: 'Token não encontrado' });
  }

  const tokenAuth = authorization.length === 16 && typeof authorization === 'string';

  if (!tokenAuth) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

module.exports = tokenValidation;