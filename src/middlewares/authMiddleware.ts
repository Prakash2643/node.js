import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Request type to include user
interface CustomRequest extends Request {
  user?: any; // or a more specific type if you have one
}

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  // Retrieve token from Authorization header
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Access Denied' }); // Return JSON response
  }

  try {
    // Verify the token
    const verified = jwt.verify(token, process.env.JWT_SECRET as string); // Use environment variable for secret
    req.user = verified; // Attach verified user data to request
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Invalid Token' }); // Return JSON response
  }
};
