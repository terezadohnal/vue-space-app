const { database } = require('../database/database');

class FlightService {
  async getAll() {
    return await database().all('SELECT * FROM flights');
  }

  async getById(id) {
    const result = await database().get(
      'SELECT * FROM flights WHERE flight_id = ?',
      id
    );

    return await result;
  }

  async create(data) {
    const result = await database().run(
      'INSERT INTO flights (name, aircraft, company, departure, destination, seats) VALUES (?, ?, ?, ?, ?, ?)',
      data.name,
      data.aircraft,
      data.company,
      data.departure,
      data.destination,
      data.seats
    );

    return await this.getById(result.lastID);
  }

  async getStatusById(id) {
    return await database().get(
      'SELECT * FROM flight_status WHERE flight_id = ? ORDER BY flight_status_id DESC',
      id
    );
  }

  async setFlightStatus(data) {
    const result = await database().run(
      'INSERT INTO flight_status (flight_id, flight_status_text) VALUES (?,?)',
      data.flight_id,
      data.status
    );
    return await this.getStatusById(result.lastID);
  }
}

module.exports = new FlightService();
