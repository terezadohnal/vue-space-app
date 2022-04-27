const res = require("express/lib/response");
const { database } = require("../database/database");

class FlightService {
  async getAll() {
    return await database().all("SELECT * FROM flights");
  }

  async getById(id) {
    const result = await database().all(
      "SELECT * FROM flights WHERE id = ?",
      id
    );
    return await result;
  }

  async create(data) {
    const result = await database().run(
      "INSERT INTO flights (name, aircraft, departure, destination) VALUES (?, ?, ?, ?)",
      data.name,
      data.aircraft,
      data.departure,
      data.destination
    );

    return await this.getById(result.lastID);
  }
}

module.exports = new FlightService();
