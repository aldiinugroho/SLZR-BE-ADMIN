const bcrypt = require('bcrypt');

class Configpass {
  saltRounds = 10

  encrypt(plaintextPassword = "") {
    try {
      const hash = bcrypt.hashSync(plaintextPassword, this.saltRounds);
      return hash
    } catch (error) {
      throw "Error encrypting password"
    }
  }
  check(plaintextPassword = "", hash = "") {
    try {
      const result = bcrypt.compareSync(plaintextPassword, hash);
      return result
    } catch (error) {
      throw "Error checking password"
    }
  }
}

module.exports = Configpass