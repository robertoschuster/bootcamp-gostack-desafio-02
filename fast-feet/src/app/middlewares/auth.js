import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

// Middleware de autenticação
// verifica se o usuário está autenticado através de um token jwt na requisição
export default async (req, res, next) => {
  // Tenta obter token JWT da requisição
  const authHeader = req.headers.authorization;
  // console.log(authHeader);

  // Se o token não foi informado, retorna erro
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  /**
   * Desestruturação
   * Como split retorna um array contento Bearer + token,
   * descarta a primeira parte
   */
  const [, token] = authHeader.split(' ');
  // console.log(token);

  try {
    // Decodifica o token
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    // console.log(decoded);

    // Inclui o id do usuário na própria requisição para ser acessado nas próximas funções
    req.userId = decoded.id;
    return next();
  } catch (error) {
    // console.log(error);
    return res.status(401).json({ error: 'Token invalid' });
  }
};
