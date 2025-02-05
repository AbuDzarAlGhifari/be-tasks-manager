import pool from '../config/db.js';

export default class Task {
  static async create({ title, description, status, userId, group_id = null }) {
    const [result] = await pool.query(
      'INSERT INTO tasks (title, description, status, user_id, group_id) VALUES (?, ?, ?, ?, ?)',
      [title, description, status, userId, group_id]
    );
    return result.insertId;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
    return rows[0];
  }

  static async findAll(userId, filters = {}) {
    let query = 'SELECT * FROM tasks WHERE user_id = ?';
    const params = [userId];

    if (filters.status) {
      query += ' AND status = ?';
      params.push(filters.status);
    }

    if (filters.search) {
      query += ' AND (title LIKE ? OR description LIKE ?)';
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(filters.limit || 10, filters.offset || 0);

    const [rows] = await pool.query(query, params);
    return rows;
  }

  static async findAllAdmin(filters = {}) {
    let query = `SELECT t.*, u.username as author 
               FROM tasks t 
               JOIN users u ON t.user_id = u.id WHERE 1=1`;
    const params = [];

    if (filters.status) {
      query += ' AND t.status = ?';
      params.push(filters.status);
    }

    if (filters.search) {
      query += ' AND (t.title LIKE ? OR t.description LIKE ?)';
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }

    query += ' ORDER BY t.created_at DESC LIMIT ? OFFSET ?';
    params.push(filters.limit || 10, filters.offset || 0);

    const [rows] = await pool.query(query, params);
    return rows;
  }

  static async update(id, userId, data) {
    const [result] = await pool.query(
      'UPDATE tasks SET ? WHERE id = ? AND user_id = ?',
      [data, id, userId]
    );
    return result.affectedRows;
  }

  static async updateAdmin(id, data) {
    const [result] = await pool.query('UPDATE tasks SET ? WHERE id = ?', [
      data,
      id,
    ]);
    return result.affectedRows;
  }

  static async delete(id, userId) {
    const [result] = await pool.query(
      'DELETE FROM tasks WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return result.affectedRows;
  }

  static async createForUser({ title, description, status, userId }) {
    const [result] = await pool.query(
      'INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)',
      [title, description, status, userId]
    );
    return result.insertId;
  }

  static async findByGroup(groupId) {
    try {
      const [rows] = await pool.query(
        `SELECT t.*, u.username as author 
         FROM tasks t
         JOIN users u ON t.user_id = u.id
         WHERE t.group_id = ?
         ORDER BY t.created_at DESC`,
        [groupId]
      );
      return rows;
    } catch (error) {
      throw new Error(`Failed to fetch group tasks: ${error.message}`);
    }
  }
}
