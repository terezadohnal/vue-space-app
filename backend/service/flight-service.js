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
      'INSERT INTO flights (name, aircraft, company, date, departure, destination, seats) VALUES (?, ?, ?, "2022-07-34", ?, ?, ?)',
      data.name,
      data.aircraft,
      data.company,
      data.departure,
      data.destination,
      data.seats
    );

    return await this.getById(result.lastID);
  }
}

module.exports = new FlightService();
