import express from 'express';
import {
  createGroup,
  addGroupMember,
  getGroupTasks,
} from '../controllers/groupController.js';
import {
  authenticate,
  isGroupMember,
  isGroupOwner,
} from '../middlewares/auth.js';
import { groupMemberSchema, validate } from '../middlewares/validation.js';

const router = express.Router();

router.use(authenticate);

// Create group
router.post('/', createGroup);

// Add member (group owner only)
router.post(
  '/:groupId/members',
  isGroupOwner,
  validate(groupMemberSchema),
  addGroupMember
);

// Get group tasks
router.get('/:groupId/tasks', isGroupMember, getGroupTasks);

export default router;
