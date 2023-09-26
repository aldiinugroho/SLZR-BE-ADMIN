const EmptyChecker = require("../../../utils/emptychecker")

class ModelRequestCarBookKeepingDetail {
  userId = ""
  carId = ""
  constructor({
    userId = "",
    carId = ""
  }) {
    this.userId = new EmptyChecker().emptyString(userId, "userId tidak boleh kosong.")
    this.carId = new EmptyChecker().emptyString(carId, "carId tidak boleh kosong.")
  }
}

module.exports = {
  ModelRequestCarBookKeepingDetail
}