import pool from '../config/db.js';

export default class User {
  static async create({ username, email, password }) {
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, password]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [
      email,
    ]);
    return rows[0];
  }

  static async findAll() {
    const [rows] = await pool.query(
      'SELECT id, username, email, role FROM users'
    );
    return rows;
  }

  static async promoteToAdmin(userId) {
    const [result] = await pool.query(
      'UPDATE users SET role = "admin" WHERE id = ?',
      [userId]
    );
    return result.affectedRows;
  }

  static async delete(userId) {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [
      userId,
    ]);
    return result.affectedRows;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }
}
