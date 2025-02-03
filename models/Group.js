// import pool from '../config/db.js';

// export default class Group {
//   static async create({ name, description, createdBy }) {
//     const [result] = await pool.query(
//       'INSERT INTO `groups` (name, description, created_by) VALUES (?, ?, ?)',
//       [name, description, createdBy]
//     );
//     return result.insertId;
//   }

//   static async addMember(groupId, userId, role = 'member') {
//     await pool.query(
//       'INSERT INTO `group_members` (group_id, user_id, role) VALUES (?, ?, ?)',
//       [groupId, userId, role]
//     );
//   }

//   static async findById(id) {
//     const [rows] = await pool.query('SELECT * FROM `groups` WHERE id = ?', [
//       id,
//     ]);
//     return rows[0];
//   }

//   static async isMember(groupId, userId) {
//     const [rows] = await pool.query(
//       'SELECT * FROM `group_members` WHERE group_id = ? AND user_id = ?',
//       [groupId, userId]
//     );
//     return rows.length > 0;
//   }

//   static async getGroupTasks(groupId) {
//     const [rows] = await pool.query(
//       `SELECT t.*, u.username as author
//        FROM tasks t
//        LEFT JOIN users u ON t.user_id = u.id
//        WHERE t.group_id = ?`,
//       [groupId]
//     );
//     return rows;
//   }
// }
