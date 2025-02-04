import Group from '../models/Group.js';
import Task from '../models/Task.js';

export const createTask = async (req, res) => {
  try {
    // Validasi group jika ada group_id
    if (req.body.group_id) {
      const group = await Group.findById(req.body.group_id);
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }

      // Cek apakah user adalah member group
      const isMember = await Group.isMember(req.body.group_id, req.user.id);
      if (!isMember) {
        return res.status(403).json({ message: 'Not a group member' });
      }
    }

    const taskId = await Task.create({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json({ message: 'Task created', taskId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const tasks = await Task.findAll(req.user.id, {
      status: req.query.status,
      search: req.query.search,
      limit,
      offset,
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const affectedRows = await Task.update(
      req.params.id,
      req.user.id,
      req.body
    );

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task updated' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const affectedRows = await Task.delete(req.params.id, req.user.id);

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
