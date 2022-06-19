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
}

module.exports = new NotificationService();
