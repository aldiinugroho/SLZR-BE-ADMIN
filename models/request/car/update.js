const EmptyChecker = require("../../../utils/emptychecker")
const { ModelRequestCarOtherPriceCreate, ModelRequestCarImageCreate } = require("./create")

class ModelRequestCarUpdate {
  carId = ""
  showroomId = ""
  carBrandId = ""
  userId = ""
  carPlate = ""
  carName = ""
  carDescription = ""
  carYear = ""
  carTransmission = ""
  carFuel = ""
  carTax = new Date()
  carSTNK = false
  carBPKB = false
  carSellPrice = 0
  carBuyPrice = 0
  carImage = []
  carOtherPrice = []
  constructor({
    carId = "",
    showroomId = "",
    carBrandId = "",
    userId = "",
    carPlate = "",
    carName = "",
    carDescription = "",
    carYear = "",
    carTransmission = "",
    carFuel = "",
    carTax = new Date(),
    carSTNK = false,
    carBPKB = false,
    carSellPrice = 0,
    carBuyPrice = 0,
    carImage = [new ModelRequestCarImageCreate({})],
    carOtherPrice = [new ModelRequestCarOtherPriceCreate({})]
  }) {
    // car
    this.carId = new EmptyChecker().emptyString(carId, "carId tidak boleh kosong.")
    this.showroomId = new EmptyChecker().emptyString(showroomId, "showroomId tidak boleh kosong.")
    this.carBrandId = new EmptyChecker().emptyString(carBrandId, "carBrandId tidak boleh kosong.")
    this.userId = new EmptyChecker().emptyString(userId, "userId tidak boleh kosong.")
    this.carPlate = new EmptyChecker().emptyString(carPlate, "carPlate tidak boleh kosong.")
    this.carName = new EmptyChecker().emptyString(carName, "carName tidak boleh kosong.")
    this.carDescription = new EmptyChecker().emptyString(carDescription, "carDescription tidak boleh kosong.")
    this.carYear = new EmptyChecker().emptyString(carYear, "carYear tidak boleh kosong.")
    this.carTransmission = new EmptyChecker().emptyString(carTransmission, "carTransmission tidak boleh kosong.")
    this.carFuel = new EmptyChecker().emptyString(carFuel, "carFuel tidak boleh kosong.")
    this.carTax = new EmptyChecker().emptyDate(carTax, "carTax tidak boleh kosong.")
    this.carSTNK = new EmptyChecker().emptyBool(carSTNK, "CarSTNK tidak boleh kosong.")
    this.carBPKB = new EmptyChecker().emptyBool(carBPKB, "carBPKB tidak boleh kosong.")
    this.carSellPrice = new EmptyChecker().emptyIntOrZero(carSellPrice, "carSellPrice tidak boleh kosong.")
    this.carBuyPrice = new EmptyChecker().emptyIntOrZero(carBuyPrice, "carBuyPrice tidak boleh kosong.")

    // car image
    new EmptyChecker().emptyArray(carImage, "carImage tidak boleh kosong minimal 1.")
    this.carImage = carImage.map((i) => new ModelRequestCarImageCreate({
      carId: this.carId,
      carImage: new EmptyChecker().emptyString(i?.carImage, "carImage tidak boleh kosong.")
    }))

    // car other price
    this.carOtherPrice = carOtherPrice.map((i) => new ModelRequestCarOtherPriceCreate({
      carId: this.carId,
      carOtherPriceName: new EmptyChecker().emptyString(i?.carOtherPriceName, "carOtherPriceName tidak boleh kosong."),
      carOtherPrice: new EmptyChecker().emptyIntOrZero(i?.carOtherPrice, "carOtherPrice tidak boleh kosong."),
    }))
  }
}

module.exports = {
  ModelRequestCarUpdate
}