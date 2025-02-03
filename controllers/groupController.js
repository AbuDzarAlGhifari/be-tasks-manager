// import Group from '../models/Group.js';

// export const createGroup = async (req, res) => {
//   try {
//     const groupId = await Group.create({
//       name: req.body.name,
//       description: req.body.description,
//       createdBy: req.user.id,
//     });

//     // Tambahkan creator sebagai owner
//     await Group.addMember(groupId, req.user.id, 'owner');

//     res.status(201).json({
//       message: 'Group created successfully',
//       groupId,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const addGroupMember = async (req, res) => {
//   try {
//     const { groupId } = req.params;
//     const { userId } = req.body;

//     // Cek apakah user yang menambahkan adalah owner
//     const isOwner = await Group.isOwner(groupId, req.user.id);
//     if (!isOwner) {
//       return res
//         .status(403)
//         .json({ message: 'Only group owner can add members' });
//     }

//     await Group.addMember(groupId, userId);
//     res.json({ message: 'Member added successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getGroupTasks = async (req, res) => {
//   try {
//     const { groupId } = req.params;

//     // Cek keanggotaan group
//     const isMember = await Group.isMember(groupId, req.user.id);
//     if (!isMember && req.user.role !== 'admin') {
//       return res.status(403).json({ message: 'Not a group member' });
//     }

//     const tasks = await Group.getGroupTasks(groupId);
//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
