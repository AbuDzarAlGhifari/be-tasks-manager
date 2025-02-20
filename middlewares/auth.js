import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Group from '../models/Group.js';

dotenv.config();

export const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByEmail(decoded.email);

    if (!user) {
      throw new Error('User not found');
    }

    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
    };

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

export const isOwnerOrAdmin = (model) => async (req, res, next) => {
  try {
    const resource = await model.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    if (resource.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const isGroupOwner = async (req, res, next) => {
  try {
    const group = await Group.findById(req.params.groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    if (group.created_by !== req.user.id) {
      return res.status(403).json({ message: 'Group owner access required' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const isGroupMember = async (req, res, next) => {
  try {
    const isMember = await Group.isMember(req.params.groupId, req.user.id);

    if (!isMember) {
      return res.status(403).json({ message: 'Not a group member' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
