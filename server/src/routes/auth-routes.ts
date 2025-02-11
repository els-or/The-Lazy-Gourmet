import { Router, type Request, type Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

//register a user.
export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body; //getting data from client.
  //check if username already exists.
  const existingUser = await User.findOne({
    where: { username },
  });
  if (existingUser) {
    return res.status(409).json({ message: 'Username already exists' });
  }
  //create a new user in the database.
  try {
    await User.create({
      username,
      email,
      password,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error creating user' });
  }
  return res.status(201).json({ message: 'User created successfully' });
};

//login server.
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;  //getting data from client.

// store result of query.
  const user = await User.findOne({   //method to query a record.
    where: { username },  // where username matches username variable.
  });
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  //compare input password to the store password in a database.
  const passwordIsValid = await bcrypt.compare(password, user.password); 
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const secretKey = process.env.JWT_SECRET_KEY || '';

  //create token and return to client.
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  return res.json({ token });
};

const router = Router(); //create new instance of Router()

// POST /login - Login a user
router.post('/login', login);

router.post('/register', register)
export default router;
