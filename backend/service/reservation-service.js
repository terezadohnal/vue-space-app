const { database } = require('../database/database');

class ReservationService {
  async getReservationsByUserId(user_id) {
    return await database().all(
      'SELECT * FROM reservation WHERE user_id = ?',
      user_id
    );
  }

  async getById(id) {
    const result = await database().all(
      'SELECT * FROM reservation WHERE reservation_id = ?',
      id
    );
    return result;
  }

  async getReservedFlights(user_id) {
    const result = await database().all(
      'SELECT * FROM reservation JOIN flights USING (flight_id) WHERE user_id = ?',
      user_id
    );

    return result;
  }

  async createReservation(data) {
    const result = await database().run(
      'INSERT INTO reservation (flight_id, user_id) VALUES (?,?)',
      data.flight_id,
      data.user_id
    );

    const response = await this.getById(result.lastID);
    return response;
  }

  async deleteReservation(id) {
    const result = await database().run(
      'DELETE FROM reservation WHERE reservation_id = ?',
      id
    );
  }
}

module.exports = new ReservationService();
