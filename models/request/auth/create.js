const EmptyChecker = require("../../../utils/emptychecker")

class ModelRequestAuthCreateUser {
  name = ""
  email = ""
  password = ""
  constructor({
    name = "",
    email = "",
    password = ""
  }) {
    this.name = new EmptyChecker().emptyString(name, "Name tidak boleh kosong.")
    this.email = new EmptyChecker().emptyString(email, "Email tidak boleh kosong.")
    this.password = new EmptyChecker().emptyString(password, "Password tidak boleh kosong.")
  }
}

module.exports = {
  ModelRequestAuthCreateUser
}