import pool from '../config/db.js';

export default class Group {
  static async create({ name, description, createdBy }) {
    const [result] = await pool.query(
      'INSERT INTO `groups` (name, description, created_by) VALUES (?, ?, ?)',
      [name, description, createdBy]
    );
    return result.insertId;
  }

  static async findById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM `groups` WHERE id = ?', [
        id,
      ]);
      return rows[0];
    } catch (error) {
      throw new Error(`Failed to find group: ${error.message}`);
    }
  }

  static async addMember(groupId, userId, role = 'member') {
    try {
      await pool.query(
        'INSERT INTO group_members (group_id, user_id, role) VALUES (?, ?, ?)',
        [groupId, userId, role]
      );
    } catch (error) {
      throw new Error(`Failed to add member: ${error.message}`);
    }
  }

  static async getMembers(groupId) {
    const [rows] = await pool.query(
      `SELECT u.id, u.username, u.email, gm.role, gm.joined_at 
       FROM group_members gm
       JOIN users u ON gm.user_id = u.id
       WHERE gm.group_id = ?`,
      [groupId]
    );
    return rows;
  }

  static async delete(groupId) {
    const [result] = await pool.query('DELETE FROM `groups` WHERE id = ?', [
      groupId,
    ]);
    return result.affectedRows;
  }

  static async isMember(groupId, userId) {
    const [rows] = await pool.query(
      'SELECT * FROM group_members WHERE group_id = ? AND user_id = ?',
      [groupId, userId]
    );
    return rows.length > 0;
  }
}
