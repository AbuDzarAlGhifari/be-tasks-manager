import express from 'express';
import {
  register,
  login,
  getCurrentUser,
} from '../controllers/authController.js';
import {
  validate,
  registerSchema,
  loginSchema,
} from '../middlewares/validation.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/me', authenticate, getCurrentUser);

export default router;
