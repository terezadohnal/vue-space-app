const res = require("express/lib/response");
const { database } = require("../database/database");

class FlightService {
  async getAll() {
    return await database().all("SELECT * FROM flights");
  }

  async getById(id) {
    const result = await database().all("SELECT * FROM users WHERE id = ?", id);
    return result;
  }

  async create(data) {
    const result = await database().run(
      "INSERT INTO flights (name, aircraft, departure, destination) VALUES (?, ?, ?, ?)",
      data.name,
      data.aircraft,
      data.departure,
      data.destination
    );
    console.log(result);
    result.lastID;
    return this.getById(result.lastID);
  }
}

module.exports = new FlightService();
