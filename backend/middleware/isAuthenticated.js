import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

export const isAuthenticated = async  (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){ 
      return res.status(401).json({message: "Authorization header missing"});
    }
    const token = authHeader.split(' ')[1]; //Bearer fkgcbikewhbiuk then [Bearer, fkgcbikewhbiuk]
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      return res.status(401).json({message: "Invalid or expired token"});
    }

    const user = await User.findById(decoded.id);
    if(!user) {
      return res.status(404).json({message: "User not found"});
    }
    req.user = user; // Attach user to request object
    req.id = user._id;
    next();


  } catch (error) {
      res.status(500).json({message: error.message});
    
  }


}

export const isAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
