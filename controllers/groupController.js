import Group from '../models/Group.js';
import Task from '../models/Task.js';
import User from '../models/User.js';

export const createGroup = async (req, res) => {
  try {
    const groupId = await Group.create({
      name: req.body.name,
      description: req.body.description,
      createdBy: req.user.id,
    });

    // Add creator as owner
    await Group.addMember(groupId, req.user.id, 'owner');

    res.status(201).json({
      message: 'Group created successfully',
      groupId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addGroupMember = async (req, res) => {
  try {
    // Validasi group exists
    const group = await Group.findById(req.params.groupId);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // Validasi user exists
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await Group.addMember(
      req.params.groupId,
      req.body.userId,
      req.body.role || 'member'
    );

    res.json({ message: 'Member added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGroupTasks = async (req, res) => {
  try {
    const tasks = await Task.findByGroup(req.params.groupId);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserGroups = async (req, res) => {
  try {
    const groups = await Group.findUserGroups(req.user.id);
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGroupMembers = async (req, res) => {
  try {
    const members = await Group.getMembersWithDetails(req.params.groupId);
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
