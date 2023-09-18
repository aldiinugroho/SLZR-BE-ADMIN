const EmptyChecker = require("../../../utils/emptychecker")

class ModelRequestCarBrandCreate {
  name = ""
  constructor({
    name = ""
  }) {
    this.name = new EmptyChecker().emptyString(name, "Name tidak boleh kosong.")
  }
}

module.exports = {
  ModelRequestCarBrandCreate
}