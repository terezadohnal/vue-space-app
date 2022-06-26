const { database } = require('../database/database');

class NotificationService {
  async create(data) {
    await database().run(
      'INSERT INTO notifications (title, type, user_id) VALUES (?,?,?)',
      data.title,
      data.type,
      data.user_id
    );
  }

  async getAll(user_id) {
    return await database().all(
      'SELECT * FROM notifications JOIN users USING (user_id) WHERE user_id = ? OR role = "secretary" OR role = "technician" ORDER BY notification_id DESC',
      user_id
    );
  }

  async getById(id) {
    return await database().get('SELECT * FROM notifications WHERE id = ?', id);
  }
}

module.exports = new NotificationService();
