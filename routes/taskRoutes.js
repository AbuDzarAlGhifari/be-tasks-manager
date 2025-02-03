import express from 'express';
import { authenticate, isOwnerOrAdmin } from '../middlewares/auth.js';
import { taskSchema, validate } from '../middlewares/validation.js';
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';
import Task from '../models/Task.js';

const router = express.Router();

router.use(authenticate);

router.post('/', validate(taskSchema), createTask);
router.get('/', getTasks);
router.put('/:id', isOwnerOrAdmin(Task), validate(taskSchema), updateTask);
router.delete('/:id', isOwnerOrAdmin(Task), deleteTask);

export default router;
