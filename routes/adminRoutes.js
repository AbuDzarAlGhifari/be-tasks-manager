import express from 'express';
import { authenticate, isAdmin } from '../middlewares/auth.js';
import {
  getAllUsers,
  promoteUser,
  getAllTasks,
  updateAnyTask,
  deleteUser,
  createTaskForUser,
} from '../controllers/adminController.js';

const router = express.Router();

router.use(authenticate, isAdmin);

router.get('/users', getAllUsers);
router.patch('/users/:userId/promote', promoteUser);
router.get('/tasks', getAllTasks);
router.put('/tasks/:id', updateAnyTask);
router.delete('/users/:userId', deleteUser);

router.post('/tasks', createTaskForUser);

export default router;
