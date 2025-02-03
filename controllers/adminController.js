import User from '../models/User.js';
import Task from '../models/Task.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const promoteUser = async (req, res) => {
  try {
    const affectedRows = await User.promoteToAdmin(req.params.userId);

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User promoted to admin' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAllAdmin(req.query);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAnyTask = async (req, res) => {
  try {
    const affectedRows = await Task.updateAdmin(req.params.id, req.body);

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task updated' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// export const deleteUser = async (req, res) => {
//   try {
//     if (req.user.id === parseInt(req.params.userId)) {
//       return res.status(403).json({ message: 'Cannot delete yourself' });
//     }

//     const affectedRows = await User.delete(req.params.userId);

//     if (affectedRows === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json({ message: 'User deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.user.id === parseInt(userId)) {
      return res.status(403).json({ message: 'Cannot delete yourself' });
    }

    const affectedRows = await User.delete(userId);

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTaskForUser = async (req, res) => {
  try {
    const { title, description, status, userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const taskId = await Task.createForUser({
      title,
      description,
      status: status || 'To Do',
      userId,
    });

    res.status(201).json({
      message: 'Task created successfully',
      taskId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
