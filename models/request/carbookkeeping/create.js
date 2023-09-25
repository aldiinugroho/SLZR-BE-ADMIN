const CustomUuid = require("../../../utils/customuuid")
const EmptyChecker = require("../../../utils/emptychecker")

class ModelCarLeasingCreate {
  carLeasingId = new CustomUuid().v4()
  carBookKeepingId = ""
  carLeasing = ""
  constructor({
    carBookKeepingId = "",
    carLeasing = ""
  }) {
    this.carBookKeepingId = carBookKeepingId
    this.carLeasing = carLeasing
  }
}

class ModelCarBookKeepingCreate {
  carBookKeepingId = new CustomUuid().v4()
  carId = ""
  carBuyFromId = ""
  carBookKeepingPaymentToolsId = ""
  carBookKeepingName = ""
  carBookKeepingPhone = ""
  carBookKeepingKTP = ""
  carBookKeepingSoldPrice = 0
  carBookKeepingBookedFee = 0
  carLeasing = null
  constructor({
    carId = "",
    carBuyFromId = "",
    carBookKeepingPaymentToolsId = "",
    carBookKeepingName = "",
    carBookKeepingPhone = "",
    carBookKeepingKTP = "",
    carBookKeepingSoldPrice = 0,
    carBookKeepingBookedFee = 0,
    carLeasing = ""
  }) {
    this.carId = new EmptyChecker().emptyString(carId, "carId tidak boleh kosong.")
    this.carBuyFromId = new EmptyChecker().emptyString(carBuyFromId, "carBuyFromId tidak boleh kosong.")

    // CBFI1: DIRECT
    if (carBuyFromId === "CBFI1") {
      this.carBookKeepingPaymentToolsId = new EmptyChecker().emptyString(carBookKeepingPaymentToolsId, "carBookKeepingPaymentToolsId tidak boleh kosong.")
    }

    this.carBookKeepingName = new EmptyChecker().emptyString(carBookKeepingName, "carBookKeepingName tidak boleh kosong.")
    this.carBookKeepingPhone = new EmptyChecker().emptyString(carBookKeepingPhone, "carBookKeepingPhone tidak boleh kosong.")
    this.carBookKeepingKTP = new EmptyChecker().emptyString(carBookKeepingKTP, "carBookKeepingKTP tidak boleh kosong.")
    this.carBookKeepingSoldPrice = new EmptyChecker().emptyIntOrZero(carBookKeepingSoldPrice, "carBookKeepingSoldPrice tidak boleh kosong.")

    // carBookKeepingPaymentToolsId
    // CBKPT01: KREDIT
    // CBKPT02: CASH

    // carBuyFromId
    // CBFI1: DIRECT
    // CBFI2: WEBSITE

    // required car booked fee for website or (direct and kredit)
    if (carBuyFromId === "CBFI2" || (carBuyFromId === "CBFI1" && carBookKeepingPaymentToolsId === "CBKPT01")) {
      this.carBookKeepingBookedFee = new EmptyChecker().emptyIntOrZero(carBookKeepingBookedFee, "carBookKeepingBookedFee tidak boleh kosong.")
    }

    // required car leasing for direct and kredit only
    if (carBuyFromId === "CBFI1" && carBookKeepingPaymentToolsId === "CBKPT01") {
      this.carLeasing = new ModelCarLeasingCreate({
        carBookKeepingId: this.carBookKeepingId,
        carLeasing: new EmptyChecker().emptyString(carLeasing, "carLeasing tidak boleh kosong.")
      })
    }
  }
}

module.exports = {
  ModelCarBookKeepingCreate,
  ModelCarLeasingCreate
}