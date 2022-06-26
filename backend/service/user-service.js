const { database } = require('../database/database');
const { passwordConfig, jwtConfig } = require('../config');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const USER_ROLES = {
  CUSTOMER: 'customer',
  SECRETARY: 'secretary',
  TECHNICIAN: 'technician',
  ADMIN: 'admin',
};

class UserService {
  async getAll() {
    return await database().all('SELECT * FROM users');
  }

  async getByNickname(nickname) {
    return await database().get(
      'SELECT * FROM users WHERE nickname = ?',
      nickname
    );
  }

  async getById(id) {
    return await database().get('SELECT * FROM users WHERE user_id = ?', id);
  }

  async register(user, password) {
    const result = await database().run(
      'INSERT INTO  users (firstname, lastname, nickname, email, password, role) VALUES (?, ?, ?, ?, ?, ?)',
      user.firstname,
      user.lastname,
      user.nickname,
      user.email,
      password,
      USER_ROLES.TECHNICIAN
    );
    return result;
  }

  async generateToken(user) {
    const tokenPayload = {
      id: user.user_id,
      firstname: user.firstname,
      lastname: user.lastname,
      nickname: user.nickname,
      role: user.role,
      email: user.email,
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

  validate(data) {
    if (
      data.firstname === undefined ||
      data.firstname?.trim() === '' ||
      data.lastname === undefined ||
      data.lastname?.trim() === '' ||
      data.nickname === undefined ||
      data.nickname?.trim() === '' ||
      data.password === undefined ||
      data.password?.trim() === '' ||
      data.password.length > 8 ||
      data.password !== data.passwordConf
    ) {
      return false;
    }
    return true;
  }
}

module.exports = new UserService();
