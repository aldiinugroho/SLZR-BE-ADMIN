const EmptyChecker = require("../../../utils/emptychecker")

class ModelRequestMarkSold {
  carId = ""
  carBookKeepingId = ""
  constructor({
    carId = "",
    carBookKeepingId = ""
  }) {
    this.carId = new EmptyChecker().emptyString(carId, "carId tidak boleh kosong.")
    this.carBookKeepingId = new EmptyChecker().emptyString(carBookKeepingId, "carBookKeepingId tidak boleh kosong.")
  }
}

module.exports = {
  ModelRequestMarkSold
}