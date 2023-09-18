const EmptyChecker = require("../../../utils/emptychecker")

class ModelRequestAuthLogin {
  email = ""
  password = ""
  constructor({
    email = "",
    password = ""
  }) {
    this.email = new EmptyChecker().emptyString(email, "Email tidak boleh kosong.")
    this.password = new EmptyChecker().emptyString(password, "Password tidak boleh kosong.")
  }
}

module.exports = {
  ModelRequestAuthLogin
}