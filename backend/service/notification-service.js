const { database } = require('../database/database');

class NotificationService {
  async create(user_id, title, type) {
    await database().run(
      'INSERT INTO notifications (title, type, user_id) VALUES (?,?,?)',
      title,
      type,
      user_id
    );
  }

  async getAll(user_id) {
    return await database().all(
      'SELECT * FROM notifications WHERE user_id = ?',
      user_id
    );
  }
}

module.exports = new NotificationService();
