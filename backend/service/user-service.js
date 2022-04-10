const { database } = require("../database/database");
const { passwordConfig, jwtConfig } = require("../config");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const USER_ROLES = {
  CUSTOMER: "customer",
  SECRETARY: "secretary",
  TECHNICIAN: "technician",
  ADMIN: "admin",
};

class UserService {
  async getAll() {
    return await database().all("SELECT * FROM users");
  }

  async getByUsername(username) {
    return await database().get(
      "SELECT * FROM users WHERE username = ?",
      username
    );
  }

  async register(user, password) {
    const result = await database().run(
      "INSERT INTO  users (firstname, lastname, nickname, email, password, role) VALUES (?, ?, ?, ?, ?, ?)",
      user.firstname,
      user.lastname,
      user.nickname,
      user.email,
      password,
      USER_ROLES.CUSTOMER
    );
    console.log(result);
    return result;
  }

  async generateToken(user) {
    const tokenPayload = {
      username: user.username,
      role: user.role,
    };
    return jwt.sign(tokenPayload, jwtConfig.secret, {
      algorithm: jwtConfig.algorithms[0],
    });
  }

  hashPassword(password) {
    return crypto
      .pbkdf2Sync(
        password,
        passwordConfig.salt,
        passwordConfig.iterations,
        passwordConfig.keylen,
        passwordConfig.digest
      )
      .toString(`hex`);
  }
}

module.exports = new UserService();
