import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, LoginData } from '@shared/schema';
import { storage } from './storage';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-replace-in-production';

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateToken(user: User): string {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email,
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function authenticateUser(loginData: LoginData): Promise<{ user: User; token: string } | null> {
  const user = await storage.getUserByEmail(loginData.email);
  
  if (!user || !user.password) {
    return null;
  }

  const isValidPassword = await verifyPassword(loginData.password, user.password);
  
  if (!isValidPassword) {
    return null;
  }

  const token = generateToken(user);
  
  return { user, token };
}

// Middleware to verify JWT token
export async function authMiddleware(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.substring(7);
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const user = await storage.getUser(decoded.id);
  
  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  req.user = user;
  next();
}

// Admin middleware to check if user is admin
export function adminMiddleware(req: any, res: any, next: any) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admin access required' });
  }
  next();
}