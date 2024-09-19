import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';

const verifyToken = async (req, res, next) => {
    let token;
    
    token = req.cookies.jwt;
  
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
  
        req.user = await UserModel.findById(decoded.userId).select('-password');
  
        next();
      } catch (error) {
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
    } else {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
};
  
  export default verifyToken;