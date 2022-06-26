const { database } = require('../database/database');

class ReservationService {
  async getAll() {
    return await database().all(
      'SELECT * FROM reservation JOIN flights USING (flight_id) JOIN users USING (user_id)'
    );
  }

  async getReservationsByUserId(user_id) {
    return await database().all(
      'SELECT * FROM reservation WHERE user_id = ?',
      user_id
    );
  }

  async getById(id) {
    const result = await database().get(
      'SELECT * FROM reservation WHERE reservation_id = ?',
      id
    );

    return await result;
  }

  async getReservationsByFlightId(id) {
    const result = await database().all(
      'SELECT * FROM reservation WHERE flight_id = ?',
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

    const user = await database().all(
      'SELECT firstname, lastname FROM users WHERE user_id = ?',
      data.user_id
    );

    await database().run(
      'INSERT INTO reservation_passagers (reservation_id, name, surname) VALUES (?,?,?)',
      result.lastID,
      user[0].firstname,
      user[0].lastname
    );

    const response = await this.getById(result.lastID);
    return response;
  }

  async deleteReservation(id) {
    const result = await database().run(
      'DELETE FROM reservation WHERE reservation_id = ?',
      id
    );
    return result;
  }

  async addPassagersToReservation(data) {
    const { reservation_id, passagers } = data;

    passagers.forEach(async (passager) => {
      await database().run(
        'INSERT INTO reservation_passagers (reservation_id, name, surname) VALUES (?,?,?)',
        reservation_id,
        passager.name,
        passager.surname
      );
    });

    return 'created';
  }

  async getNumberOfPassagersInFlight(id) {
    const result = await database().get(
      'SELECT count(*) num FROM  reservation JOIN reservation_passagers USING (reservation_id) JOIN flights USING (flight_id) WHERE flight_id = ?',
      id
    );
    return result;
  }

  async getPassagersInFlight(id) {
    const result = await database().all(
      'SELECT rs.name, rs.surname FROM reservation_passagers AS rs JOIN reservation USING(reservation_id) JOIN flights USING (flight_id) WHERE flight_id = ?',
      id
    );
    return result;
  }
}

module.exports = new ReservationService();
