const EmptyChecker = require("../../../utils/emptychecker")
const { ModelCarLeasingCreate } = require("./create")

class ModelRequestUpdateWeb {
  carId = ""
  carBookKeepingId = ""
  carBookKeepingPaymentToolsId = ""
  carBookKeepingName = ""
  carBookKeepingPhone = ""
  carBookKeepingKTP = ""
  carBookKeepingSoldPrice = 0
  carLeasing = null
  constructor({
    carId = "",
    carBookKeepingId = "",
    carBookKeepingPaymentToolsId = "",
    carBookKeepingName = "",
    carBookKeepingPhone = "",
    carBookKeepingKTP = "",
    carBookKeepingSoldPrice = 0,
    carLeasing = ""
  }) {
    this.carId = new EmptyChecker().emptyString(carId, "carId tidak boleh kosong.")
    this.carBookKeepingId = new EmptyChecker().emptyString(carBookKeepingId, "carBookKeepingId tidak boleh kosong.")
    this.carBookKeepingPaymentToolsId = new EmptyChecker().emptyString(carBookKeepingPaymentToolsId, "carBookKeepingPaymentToolsId tidak boleh kosong.")
    this.carBookKeepingName = new EmptyChecker().emptyString(carBookKeepingName, "carBookKeepingName tidak boleh kosong.")
    this.carBookKeepingPhone = new EmptyChecker().emptyString(carBookKeepingPhone, "carBookKeepingPhone tidak boleh kosong.")
    this.carBookKeepingKTP = new EmptyChecker().emptyString(carBookKeepingKTP, "carBookKeepingKTP tidak boleh kosong.")
    this.carBookKeepingSoldPrice = new EmptyChecker().emptyIntOrZero(carBookKeepingSoldPrice, "carBookKeepingSoldPrice tidak boleh kosong.")
    if (carBookKeepingPaymentToolsId === "CBKPT01") {
      this.carLeasing = new ModelCarLeasingCreate({
        carBookKeepingId: carBookKeepingId,
        carLeasing: new EmptyChecker().emptyString(carLeasing, "carLeasing tidak boleh kosong.")
      })
    }
  }
}

module.exports = {
  ModelRequestUpdateWeb
}