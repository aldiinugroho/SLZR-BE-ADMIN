const EmptyChecker = require("../../../utils/emptychecker")

class ModelRequestCarBookKeepingCancel {
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
  ModelRequestCarBookKeepingCancel
}