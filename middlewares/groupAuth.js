// import Group from '../models/Group.js';

// export const isGroupOwner = async (req, res, next) => {
//   try {
//     const isOwner = await Group.isOwner(req.params.groupId, req.user.id);
//     if (!isOwner) {
//       return res.status(403).json({ message: 'Group owner required' });
//     }
//     next();
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const isGroupMember = async (req, res, next) => {
//   try {
//     const isMember = await Group.isMember(req.params.groupId, req.user.id);
//     if (!isMember && req.user.role !== 'admin') {
//       return res.status(403).json({ message: 'Group member required' });
//     }
//     next();
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
