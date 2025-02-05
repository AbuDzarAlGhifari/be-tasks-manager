import express from 'express';
import {
  createGroup,
  addGroupMember,
  getGroupTasks,
  getUserGroups,
  getGroupMembers,
} from '../controllers/groupController.js';
import {
  authenticate,
  isGroupMember,
  isGroupOwner,
} from '../middlewares/auth.js';
import { groupMemberSchema, validate } from '../middlewares/validation.js';

const router = express.Router();

router.use(authenticate);

router.post('/', createGroup);
router.post(
  '/:groupId/members',
  isGroupOwner,
  validate(groupMemberSchema),
  addGroupMember
);
router.get('/:groupId/tasks', isGroupMember, getGroupTasks);
router.get('/joined', getUserGroups);
router.get('/:groupId/members', isGroupMember, getGroupMembers);

export default router;
